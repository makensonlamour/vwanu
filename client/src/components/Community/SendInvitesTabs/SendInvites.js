import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { useParams, useOutletContext, Link } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { TextArea, Submit, Form } from "../../../components/form";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import Chip from "@mui/material/Chip";
import { useGetAllMembers } from "../../../features/user/userSlice";
import {
  useGetAllMembersCommunity,
  useSendInvitation,
  useGetCommunityRole,
  useGetCommunityInvitation,
} from "../../../features/community/communitySlice";
import { isMember, isInvitation } from "../../../helpers/index";
import InputSearch from "../../../features/search/components/InputSearch";
import toast, { Toaster } from "react-hot-toast";

const sendInvitationSuccess = () =>
  toast.success("You sent the invitation", {
    position: "top-center",
  });

const sendInvitationError = () =>
  toast.error("Sorry. Error on sending the invitation!", {
    position: "top-center",
  });

const SendInvites = () => {
  const user = useOutletContext();
  const { id } = useParams();
  const { data: members, isLoading: loadingMember, isError, hasNextPage, fetchNextPage } = useGetAllMembers(["members", "all"]);
  const { data: listMemberCommunity } = useGetAllMembersCommunity(["user", "community", "all"], id === "undefined" ? false : true, id);
  const { data: listInvitation } = useGetCommunityInvitation(["community", "invitation", "all"], id !== "undefined" ? true : false, id);
  const sendInvitation = useSendInvitation(["community", "invitation"]);
  const { data: roles } = useGetCommunityRole(["roles", "all"]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const initialValues = {
    message: "",
  };

  const ValidationSchema = Yup.object().shape({
    message: Yup.string().label("Community Name"),
  });

  function reloadPage() {
    queryClient.refetchQueries(["members", "all"]);
  }

  const [selectMember, setSelectMember] = useState([]);

  const handleRemove = (chipToDelete) => () => {
    setSelectMember((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  const handleAdd = (data) => {
    setIsLoading(true);
    setSelectMember((selectMember) => [...selectMember, data]);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let roleCommunityId;
      roles?.data?.map((role) => {
        if (role?.name === "member") {
          return (roleCommunityId = role?.id);
        }
      });
      let guest = selectMember?.map((mem) => {
        return mem?.id;
      });
      const dataObj = {
        CommunityRoleId: roleCommunityId,
        CommunityId: id,
        guestId: guest,
      };

      await sendInvitation.mutateAsync(dataObj);
      sendInvitationSuccess();
      setSelectMember([]);
    } catch (e) {
      sendInvitationError();
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  function isIntoArray(data) {
    let memb = selectMember?.filter((member) => member?.id === data?.id);
    return memb?.length === 0 ? false : true;
  }

  return (
    <>
      <Toaster />
      <div className="lg:hidden">
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 fixed z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-md lg:max-w-2xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t">
                    <p className="text-md font-medium">Select Members</p>
                    <button onClick={() => setShowModal(false)} className="text-lg font-medium">
                      x
                    </button>
                  </div>
                  <div className="border-r border-gray-300">
                    <p className="text-lg font-semibold p-4">Members</p>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="py-4 px-6">
                      <InputSearch
                        setIsSearchOpen={setIsSearchOpen}
                        placeholder="Search members"
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                        selectMember={selectMember}
                      />
                    </div>
                    <div className="py-4 px-6">
                      {loadingMember ? (
                        <div className="flex justify-center py-5">
                          <Loader color="black" />
                        </div>
                      ) : isError ? (
                        <div className="py-5 m-auto text-center px-2">
                          {"There was an error while fetching the data. "}{" "}
                          <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
                            Tap to retry
                          </Link>{" "}
                        </div>
                      ) : members?.pages && members?.pages?.length > 0 ? (
                        <InfiniteScroll
                          fetchMore={fetchNextPage}
                          isError={isError}
                          isLoading={loadingMember}
                          hasNext={hasNextPage}
                          refetch={() => queryClient.invalidateQueries(["members", "all"])}
                          container={true}
                          classNameContainer={"overflow-y-auto h-[20vh]"}
                          loader={
                            <div className="flex justify-center py-5">
                              <Loader color="black" />
                            </div>
                          }
                          errorRender={
                            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                              {"There was an error while fetching the data. "}{" "}
                              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["members", "all"])}>
                                Tap to retry
                              </Link>{" "}
                            </div>
                          }
                        >
                          {members?.pages.map((page) => {
                            return page?.data?.data?.map((member) => {
                              return !isMember(listMemberCommunity, member) || !isInvitation(listInvitation, member) ? null : (
                                <div key={member?.firstName + "_" + member?.id} className="flex justify-between items-center mb-4">
                                  {user?.id !== member?.id && (
                                    <div className="flex justify-evenly items-center">
                                      <div className="mr-4">
                                        <img
                                          src={member?.profilePicture?.original}
                                          alt="profile_img"
                                          className="bg-gray-100 mask mask-squircle w-10 h-10"
                                        />
                                      </div>
                                      <div className="">{member?.firstName + " " + member?.lastName}</div>
                                    </div>
                                  )}
                                  {user?.id !== member?.id && (
                                    <div className="">
                                      {isIntoArray(member) ? (
                                        <button onClick={handleRemove(member)}>remove</button>
                                      ) : (
                                        <button onClick={() => handleAdd(member)}>add</button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            });
                          })}
                        </InfiniteScroll>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div>
        {/* For large screen */}
        <div className="hidden lg:block border border-gray-300 rounded-lg">
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-300">
              <p className="text-lg font-semibold p-4">Members</p>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="py-4 px-6">
                <InputSearch
                  setIsSearchOpen={setIsSearchOpen}
                  placeholder="Search members"
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                  selectMember={selectMember}
                />
              </div>
              <div className="py-4 px-6">
                {loadingMember ? (
                  <div className="flex justify-center py-5">
                    <Loader color="black" />
                  </div>
                ) : isError ? (
                  <div className="py-5 m-auto text-center px-2">
                    {"There was an error while fetching the data. "}{" "}
                    <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
                      Tap to retry
                    </Link>{" "}
                  </div>
                ) : members?.pages && members?.pages?.length > 0 ? (
                  <InfiniteScroll
                    fetchMore={fetchNextPage}
                    isError={isError}
                    isLoading={loadingMember}
                    hasNext={hasNextPage}
                    refetch={() => queryClient.invalidateQueries(["members", "all"])}
                    container={true}
                    classNameContainer={"overflow-y-auto h-[20vh]"}
                    loader={
                      <div className="flex justify-center py-5">
                        <Loader color="black" />
                      </div>
                    }
                    errorRender={
                      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                        {"There was an error while fetching the data. "}{" "}
                        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["members", "all"])}>
                          Tap to retry
                        </Link>{" "}
                      </div>
                    }
                  >
                    {members?.pages.map((page) => {
                      return page?.data?.data?.map((member) => {
                        console.log(!isMember(listMemberCommunity?.data, member), !isInvitation(listInvitation?.data, member));

                        return isMember(listMemberCommunity?.data, member) || isInvitation(listInvitation?.data, member) ? null : (
                          <div key={member?.firstName + "_" + member?.id} className="flex justify-between items-center mb-4">
                            {user?.id !== member?.id && (
                              <div className="flex justify-evenly items-center">
                                <div className="mr-4">
                                  <img
                                    src={member?.profilePicture?.original}
                                    alt="profile_img"
                                    className="bg-gray-100 mask mask-squircle w-10 h-10"
                                  />
                                </div>
                                <div className="">{member?.firstName + " " + member?.lastName}</div>
                              </div>
                            )}
                            {user?.id !== member?.id && (
                              <div className="">
                                {isIntoArray(member) ? (
                                  <button onClick={handleRemove(member)}>remove</button>
                                ) : (
                                  <button onClick={() => handleAdd(member)}>add</button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      });
                    })}
                  </InfiniteScroll>
                ) : null}
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold p-4">Send Invites</p>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="px-6">
                <div className="bg-sky-100 border border-sky-500 rounded-lg p-3 mt-4">
                  {"Select members to invite by clicking the + button next to each member."}
                </div>
                <div className="flex flex-wrap p-4 mt-4">
                  {selectMember?.map((data) => {
                    return (
                      <div className="mr-2 mb-2" key={data?.id}>
                        <Chip label={data.firstName + " " + data?.lastName} onDelete={handleRemove(data)} />
                      </div>
                    );
                  })}
                  <input placeholder="" className="focus:border-0 outline-0 border-none active:border-none" autoFocus={true} />
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="">
                <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full">
                  <TextArea
                    isableUnderline={true}
                    autoCapitalize="none"
                    placeholder="Customize the message of your invites"
                    name="message"
                    type="text"
                    maxRows="5"
                    minRows="5"
                    style={{ width: "100%", border: "none" }}
                    sx={{
                      input: {
                        border: "none",
                      },
                    }}
                    className="w-full mt-1 p-2 mb-4 outline-0 text-secondary placeholder:text-gray-300 focus:border-0  rounded-2xl input-secondary border-0"
                  />
                  <Submit
                    className="w-full lg:w-fit py-2 px-4 rounded-2xl text-base-100 text-md md:w-[30%]"
                    title={isLoading ? <Loader /> : "Send Invites"}
                  />{" "}
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* For mobile screen */}
        <div className={`${showModal ? "opacity-10" : ""} lg:hidden border rounded-xl`}>
          <div className="flex justify-between items-center mx-2">
            <p className="text-lg font-semibold py-2 ">Send Invites</p>
            <div onClick={() => setShowModal(true)} className="">
              Add
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="px-6">
            <div className="bg-sky-100 border border-sky-500 rounded-lg p-3 mt-4">
              {"Select members to invite by clicking the + button next to each member."}
            </div>
            <div className="flex flex-wrap p-4 mt-4">
              {selectMember?.map((data) => {
                return (
                  <div className="mr-2 mb-2" key={data?.id}>
                    <Chip label={data.firstName + " " + data?.lastName} onDelete={handleRemove(data)} />
                  </div>
                );
              })}
              <input placeholder="" className="focus:border-0 outline-0 border-none active:border-none" autoFocus={true} />
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="">
            <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleSubmit} className="w-full pb-4">
              <TextArea
                isableUnderline={true}
                autoCapitalize="none"
                placeholder="Customize the message of your invites"
                name="message"
                type="text"
                maxRows="5"
                minRows="5"
                style={{ width: "100%", border: "none" }}
                sx={{
                  input: {
                    border: "none",
                  },
                }}
                className="w-full mt-1 p-2 mb-4 outline-0 text-secondary placeholder:text-gray-300 focus:border-0  rounded-2xl input-secondary border-0"
              />
              <div className="flex justify-end mx-2">
                <Submit
                  className="w-fit lg:w-fit py-1 px-4 rounded-xl text-base-100 text-md md:w-[30%]"
                  title={isLoading ? <Loader /> : "Send Invites"}
                />{" "}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

SendInvites.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default SendInvites;
