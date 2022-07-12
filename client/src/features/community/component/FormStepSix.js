import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { TextArea, Submit, Form } from "../../../components/form";
import Chip from "@mui/material/Chip";
import { useGetAllMembers } from "../../user/userSlice";

//Functions for notification after actions

const FormStepSix = ({ setStep, currentStep, data }) => {
  const user = useOutletContext();
  const navigate = useNavigate();
  const { data: members } = useGetAllMembers(["members", "all"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    navigate("../../group/" + data?.id);
  };
  const handlePrevious = () => {
    setStep(currentStep - 1);
  };

  // const members = [
  //   {
  //     id: 0,
  //     profilePicture: "",
  //     name: "Adele",
  //   },
  //   {
  //     id: 1,
  //     profilePicture: "",
  //     name: "Alyssa",
  //   },
  //   {
  //     id: 2,
  //     profilePicture: "",
  //     name: "Arianna",
  //   },
  //   {
  //     id: 3,
  //     profilePicture: "",
  //     name: "Charles",
  //   },
  //   {
  //     id: 4,
  //     profilePicture: "",
  //     name: "Maverick",
  //   },
  //   {
  //     id: 5,
  //     profilePicture: "",
  //     name: "Neville",
  //   },
  // ];

  const initialValues = {
    message: "",
  };

  const ValidationSchema = Yup.object().shape({
    message: Yup.string().label("Community Name"),
  });

  const [selectMember, setSelectMember] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setSelectMember((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  const handleAdd = (data) => {
    setIsLoading(true);
    setSelectMember((selectMember) => [...selectMember, data]);
    setIsLoading(false);
  };

  const handleSubmit = (data) => {
    console.log(data);
  };

  function isIntoArray(data) {
    let memb = selectMember?.filter((member) => member?.id === data?.id);
    console.log(memb);

    return memb?.length === 0 ? false : true;
  }

  return (
    <>
      <div className="my-4 mx-24">
        <div className="border border-gray-300 rounded-lg">
          <div className="grid grid-cols-2">
            <div className="border-r border-gray-300">
              <p className="text-lg font-semibold p-4">Members</p>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="py-4 px-6">
                <input className="w-full outline-0 py-2 px-4 border border-gray-300 rounded-lg" placeholder="Search Members" />
              </div>
              <div className="py-4 px-6">
                {members?.data?.data?.map((member) => {
                  return (
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
                      <div className="">
                        {isIntoArray(member) ? (
                          <button onClick={handleDelete(member)}>remove</button>
                        ) : (
                          <button onClick={() => handleAdd(member)}>add</button>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                        <Chip label={data.firstName + " " + data?.lastName} onDelete={handleDelete(data)} />
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
                    className="mt-1 p-2 mb-4 outline-0 text-secondary placeholder:text-gray-300 focus:border-0  rounded-2xl input-secondary border-0"
                  />
                  <Submit className="w-full rounded-2xl text-base-100 text-md md:w-[30%]" title={isLoading ? <Loader /> : "Send Invites"} />{" "}
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handlePrevious()}
            className="btn btn-primary mt-4 normal-case hover:bg-secondary w-full rounded-2xl text-base-100 py-1 text-md md:w-1/5"
          >
            {isLoading ? <Loader /> : "Previous Step"}
          </button>
          <button
            onClick={() => handleNext()}
            className="btn btn-primary mt-4 normal-case hover:bg-secondary w-full rounded-2xl text-base-100 py-1 text-md md:w-1/5"
          >
            {isLoading ? <Loader /> : "Finish"}
          </button>
        </div>
      </div>
    </>
  );
};

FormStepSix.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default FormStepSix;
