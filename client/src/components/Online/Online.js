import React, { Fragment } from "react";
import { styled, Avatar, Badge, Tooltip, Button } from "@mui/material";

import UserOnline from "../../data/User";

const StyledBadgeOnline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#ff0000",
    color: "#ff0000",
    borderRadius: "50%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Online = () => {
  return (
    <>
      <div className="w-full mr-1 border-t py-1">
        {UserOnline?.map((user, index) => {
          return (
            <>
              <div key={index} className="my-1 mr-4 w-full rounded-sm avatar">
                <Tooltip
                  title={
                    <Fragment>
                      <div className="flex">
                        <img src={user.profilePicture} className="w-14 h-14 rounded-full mr-3" alt={user.firstName + " " + user.lastName} />
                        <div className="items-center">
                          {" "}
                          <span className="text-md">{user.firstName + " " + user.lastName}</span>
                          <span className="block">{user.lastSeen}</span>
                        </div>
                      </div>
                    </Fragment>
                  }
                  placement="left"
                >
                  <Button>
                    {user?.online ? (
                      <StyledBadgeOnline overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                        <Avatar
                          alt={user.firstName + " " + user.lastName}
                          src={user?.profilePicture}
                          style={{ width: "48px", height: "48px", marginLeft: "5px", alignSelf: "center", borderRadius: "36%" }}
                        />
                      </StyledBadgeOnline>
                    ) : (
                      <StyledBadgeOffline overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                        <Avatar
                          alt={user.firstName + " " + user.lastName}
                          src={user?.profilePicture}
                          style={{ width: "48px", height: "48px", marginLeft: "5px", alignSelf: "center", borderRadius: "36%" }}
                        />
                      </StyledBadgeOffline>
                    )}
                  </Button>
                </Tooltip>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Online;
