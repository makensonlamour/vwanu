import { FcNews } from "react-icons/fc";
import { FcGallery } from "react-icons/fc";
import { FcFolder } from "react-icons/fc";

export const ItemSidebarLeft = [
  {
    menuTitle: "Me",
    menuItems: [
      {
        title: "News Feed",
        link: "/home",
        icon: <FcNews className="mx-2" size="24px" />,
      },
      {
        title: "Albums",
        link: "/albums",
        icon: <FcGallery className="mx-2" size="24px" />,
      },
      {
        title: "Saved Posts",
        link: "/bookmarks",
        icon: <FcFolder className="mx-2" size="24px" />,
      },
    ],
  },
  {
    menuTitle: "Community",
    menuItems: [
      {
        title: "Interest",
        link: "/interest",
        icon: <FcNews className="mx-2" size="24px" />,
      },
      {
        title: "Forums",
        link: "/forums",
        icon: <FcGallery className="mx-2" size="24px" />,
      },
      {
        title: "My Interests",
        link: "/myinterest",
        icon: <FcFolder className="mx-2" size="24px" />,
      },
      {
        title: "My Groups",
        link: "/mygroups",
        icon: <FcFolder className="mx-2" size="24px" />,
      },
      {
        title: "My Pages",
        link: "/mypages",
        icon: <FcFolder className="mx-2" size="24px" />,
      },
    ],
  },
];
