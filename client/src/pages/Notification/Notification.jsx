/*eslint-disable */
import React from "react";

const Notification = () => {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 mt-8 mb-8">
        <h2 className="my-3 px-3 text-xl font-medium">Latest updates</h2>
        <Stack spacing={1}>
          {data?.map((latest, idx) => {
            if (idx <= 5) {
              return (
                <Item
                  key={latest?.User?.firstName + "" + idx}
                  elevation={0}
                  style={{
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    backgroundColor: `${latest?.view ? "" : "#EFF3FF"}`,
                  }}
                >
                  <div className="w-[3rem]">
                    <img
                      className="mask mask-squircle items-center justify-center w-[5rem] h-10 rounded-lg"
                      src={latest?.User?.profilePicture}
                      alt={latest?.User?.firstName}
                    />
                  </div>
                  <div>
                    <p to="#" className=" text-sm line-clamp-2 max-w-[22ch] text-ellipsis whitespace-wrap overflow-hidden ml-2 pb-1">
                      <Link className="hover:text-secondary" to="#">
                        <span className="font-semibold">{latest?.User?.firstName + " " + latest?.User?.lastName}</span>
                        <span className="font-light">{" " + latest?.message}</span>
                      </Link>
                    </p>
                    <p className=" text-gray-400 font-medium text-xs ml-2">
                      {formatDistance(parseISO(latest?.createdAt), new Date(), [
                        {
                          includeSeconds: true,
                        },
                      ])}{" "}
                      {" ago"}
                    </p>
                  </div>
                </Item>
              );
            }
          })}
          {data?.length < 5 && (
            <Link to={"../../notifications"} className="text-sm mx-auto font-[500] hover:text-primary">
              View more updates
            </Link>
          )}
        </Stack>
      </div>
    </>
  );
};

export default Notification;
