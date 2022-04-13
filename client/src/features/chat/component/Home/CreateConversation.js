import React from "react";
import PropTypes from "prop-types";
// import { IMAGE_PROXY, THEMES } from "../../shared/constants";

import Spin from "react-cssfx-loading/src/Spin";
// import { useNavigate } from "react-router-dom";

const CreateConversation = ({ setIsOpened }) => {
  //   const data = [];
  const error = null;
  const loading = false;

  //   const [isCreating, setIsCreating] = useState(false);

  //   const currentUser = {};
  //   const [selected, setSelected] = useState([]);

  //   const navigate = useNavigate();

  //   const handleToggle = (uid) => {
  //     if (selected.includes(uid)) {
  //       setSelected(selected.filter((item) => item !== uid));
  //     } else {
  //       setSelected([...selected, uid]);
  //     }
  //   };

  //   const handleCreateConversation = async () => {
  //     console.log("create conversation");
  //   };

  return (
    <div
      onClick={() => setIsOpened(false)}
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-dark mx-3 w-full max-w-[500px] overflow-hidden rounded-lg">
        <div className="border-dark-lighten flex items-center justify-between border-b py-3 px-3">
          <div className="flex-1"></div>
          <div className="flex flex-1 items-center justify-center">
            <h1 className="whitespace-nowrap text-center text-2xl">New conversation</h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <button onClick={() => setIsOpened(false)} className="bg-dark-lighten flex h-8 w-8 items-center justify-center rounded-full">
              <i className="bx bx-x text-2xl"></i>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Spin color="#0D90F3" />
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-center">Something went wrong</p>
          </div>
        ) : (
          <>
            {/*}
            {isCreating && (
              <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]">
                <Spin color="#0D90F3" />
              </div>
                              )}
            {*/}
            <div className="flex h-96 flex-col items-stretch gap-2 overflow-y-auto py-2">
              {/*}
              {data?.docs
                .filter((doc) => doc.data().uid !== currentUser?.uid)
                .map((doc) => (
                  <div
                    key={doc.data().uid}
                    onClick={() => handleToggle(doc.data().uid)}
                    className="hover:bg-dark-lighten flex cursor-pointer items-center gap-2 px-5 py-2 transition"
                  >
                    <input className="flex-shrink-0 cursor-pointer" type="checkbox" checked={selected.includes(doc.data().uid)} readOnly />
                    <img className="h-8 w-8 flex-shrink-0 rounded-full object-cover" src={IMAGE_PROXY(doc.data().photoURL)} alt="" />
                    <p>{doc.data().displayName}</p>
                  </div>
                ))}
                {*/}
            </div>
            <div className="border-dark-lighten flex justify-end border-t p-3">
              {/*}  <button
                disabled={selected.length === 0}
                onClick={handleCreateConversation}
                className="bg-dark-lighten rounded-lg py-2 px-3 transition duration-300 hover:brightness-125 disabled:!brightness-[80%]"
              >
                Start conversation
            </button> {*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CreateConversation.propTypes = {
  setIsOpened: PropTypes.func.isRequired,
};

export default CreateConversation;
