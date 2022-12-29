import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../../search/components/InputSearch";
import Chip from "@mui/material/Chip";
import { BsSearch } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";

import InputMessage from "./../message/InputMessage";

const CreateConversation = ({ setSelectedConversation, setCreateConversationOpened }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectMember, setSelectMember] = useState([]);
  const handleRemove = (chipToDelete) => () => {
    setSelectMember((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  const handleAdd = (data) => {
    // eslint-disable-next-line no-unused-vars
    setSelectMember((selectMember) => [data]);
    // setSelectMember((selectMember) => [...selectMember, data]);
  };

  return (
    <>
      <div className="w-full h-[100vh]">
        <div className="flex lg:flex-none px-2 py-4 lg:py-[1.60rem] lg:px-10">
          <div className="w-[40%] lg:hidden">
            <button
              onClick={() => {
                setSelectedConversation(false);
                setCreateConversationOpened(false);
                navigate("../../messages");
              }}
              className="lg:hidden mr-4 px-1 py-1 rounded-xl border border-gray-200 hover:bg-primary"
            >
              <BiArrowBack className="inline mr-1" size={"20px"} />
              Back
            </button>
          </div>
          <div className="w-[60%] lg:w-full">
            <p className="text-left lg:text-left text-xl font-semibold">New Message</p>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-200"></div>
        <div className="grid grid-rows-4 max-h-[90vh] h-[90vh]">
          <div className="overflow-auto row-span-3">
            <div className="flex justify-between items-center py-2 px-2">
              <div className="flex flex-wrap px-4 mt-2">
                {selectMember?.map((data) => {
                  return (
                    <div className="lg:mr-2 mb-2" key={data?.id}>
                      <Chip label={data.firstName + " " + data?.lastName} onDelete={handleRemove(data)} />
                    </div>
                  );
                })}
              </div>
              {!(selectMember?.length === 0 || isSearchOpen) && (
                <button className="text-gray-400" onClick={() => setIsSearchOpen(true)}>
                  <BsSearch size={"24px"} className="" />
                </button>
              )}
            </div>
            {(selectMember?.length === 0 || isSearchOpen) && (
              <div className="px-2">
                <InputSearch
                  setIsSearchOpen={setIsSearchOpen}
                  placeholder={"Type to search a friend"}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                  selectMember={selectMember}
                />
              </div>
            )}
          </div>
          <div className="row-span-1 max-h-[10vh] h-[10vh]">
            <InputMessage type={"new_conversation"} selectMember={selectMember} />
          </div>
        </div>
      </div>
    </>
  );
};

CreateConversation.propTypes = {
  setIsOpened: PropTypes.func.isRequired,
  setSelectedConversation: PropTypes.func,
  setCreateConversationOpened: PropTypes.func,
};

export default CreateConversation;
