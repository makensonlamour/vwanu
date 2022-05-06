import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Stack, styled } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab";
import InfiniteScroll from "react-infinite-scroller"; //for infinite scrolling
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

//Core components

import PostList from "../../features/post/PostList";
import { useGetTimelineList } from "../../features/post/postSlice";
import InputModal from "../../features/post/components/InputModal";

const NewsFeed = () => {
  // const user = useOutletContext();

  const { data: list, isLoading, fetchNextPage, hasNextPage, isError } = useGetTimelineList(["post", "home"]);

  function reloadPage() {
    window.location.reload();
  }

  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  const blogs = [
    {
      title: "Tackle Your closest Spring cleaning",
      date: "May 14, 2019",
      image: "https://res.cloudinary.com/dnesmf7ah/image/upload/v1651626639/vwanu/profile/kma3lennundnkiacntoq.jpg",
    },
    {
      title: "The Truth About Business Blogging",
      date: "May 14, 2019",
      image: "https://picsum.photos/200/300?image=0",
    },
    {
      title: "10 Tips to stay healthy when you're not alone",
      date: "May 14, 2019",
      image: "https://picsum.photos/200/300?image=1",
    },
    {
      title: "Visiting Amsterdam on a Budget",
      date: "May 8, 2019",
      image: "https://picsum.photos/200/300?image=2",
    },
    {
      title: `OMA completes renovation of Sotheby's New things appeared for a reason`,
      date: "May 8, 2019",
      image: "https://picsum.photos/200/300?image=3",
    },
  ];

  const followings = [
    { image: "https://picsum.photos/200/300?image=0" },
    { image: "https://picsum.photos/200/300?image=1" },
    { image: "https://picsum.photos/200/300?image=2" },
    { image: "https://picsum.photos/200/300?image=3" },
    { image: "https://picsum.photos/200/300?image=4" },
    { image: "https://picsum.photos/200/300?image=5" },
    { image: "https://picsum.photos/200/300?image=6" },
    { image: "https://picsum.photos/200/300?image=7" },
    { image: "https://picsum.photos/200/300?image=8" },
    { image: "https://picsum.photos/200/300?image=9" },
    { image: "https://picsum.photos/200/300?image=10" },
    { image: "https://picsum.photos/200/300?image=11" },
    { image: "https://picsum.photos/200/300?image=12" },
  ];

  const percentage = 73;

  const steps = ["General Information", "Work Experience", "Profile Photo", "Cover Photo"];

  let content;
  if (isLoading) {
    content = <Facebook foregroundColor="#fff" />;
  } else if (list?.pages?.length > 0) {
    content = (
      <>
        <div>
          <InfiniteScroll
            /* next is the function for fetching data from backend when the user reaches the end */
            hasMore={hasNextPage}
            loadMore={fetchNextPage}
            loader={<Facebook />}
            isReverse={true}
            initialLoad={true}
            pageStart={0}
          >
            {list?.pages.map((page) => {
              return page?.data?.posts?.map((post) => {
                return <PostList key={post.id} post={post} pageTitle={""} />;
              });
            })}
          </InfiniteScroll>
        </div>
        <div className="w-full mt-6 mb-6 mx-auto text-center">
          <button className="" onClick={() => reloadPage()}>
            <FiRefreshCcw className="h-7 mx-auto" />
          </button>
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <div className="my-20 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-md">
        <Facebook />
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
    );
  } else {
    content = (
      <div className="py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">{"No posts "} </div>
    );
  }

  return (
    <>
      <Container elevation={0} className="mt-6 max-w-screen-2xl">
        <Grid elevation={0} sx={{ display: "flex" }}>
          <Grid sx={{ display: { xs: "none", md: "block" } }} elevation={0} xs={5}>
            <Item elevation={0}>
              <Grid
                sx={{ display: { xs: "none", md: "block" } }}
                elevation={0}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "0.2px solid #dcdcdc",
                }}
              >
                <h2 className="my-3 px-6 text-xl font-medium">Blog</h2>
                <Stack spacing={1}>
                  {blogs.map((blog) => {
                    return (
                      <Item
                        key={blog.title}
                        elevation={0}
                        style={{
                          paddingTop: "0.5rem",
                          paddingBottom: "0.5rem",
                          display: "flex",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        <div className="w-[6rem]">
                          <img className="mask mask-squircle w-[5rem] h-16 rounded-lg" src={blog.image} alt={blog.title} />
                        </div>
                        <div>
                          <p
                            to="#"
                            className=" text-sm line-clamp-2 max-w-[25ch] text-ellipsis whitespace-wrap overflow-hidden font-medium ml-2 pb-1"
                          >
                            <Link className="hover:text-secondary" to="/">
                              {blog.title}
                            </Link>
                          </p>
                          <p className=" text-gray-400 text-xs ml-2">{blog.date}</p>
                        </div>
                      </Item>
                    );
                  })}
                </Stack>
              </Grid>

              {/*People you're following*/}
              <Grid
                sx={{ display: { xs: "none", md: "block" } }}
                elevation={0}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "0.2px solid #dcdcdc",
                  marginTop: "2rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <h2 className="my-5 text-xl font-medium">
                  {`I'm Following `}
                  <span className="font-normal text-lg text-gray-400">13</span>
                </h2>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0} sx={{ flexWrap: "wrap" }}>
                  {followings.map((following) => {
                    return (
                      <Item key={following.image} elevation={0}>
                        <div className="w-[3rem]">
                          <img
                            className="object-cover mask mask-squircle w-[3rem] h-16 rounded-lg"
                            src={following.image}
                            alt={following.image}
                          />
                        </div>
                      </Item>
                    );
                  })}
                </Stack>
              </Grid>
            </Item>
          </Grid>
          <Grid sx={6} md={7}>
            <Item elevation={0}>
              <div className="px-3">
                <h2 className="pb-5 text-3xl font-bold">Activity Feed</h2>
                <InputModal reference="newsfeed" />
                <div className="w-full">{content}</div>
              </div>
            </Item>
          </Grid>

          <Grid elevation={0} xs={5}>
            <Item elevation={0}>
              <Grid
                sx={{ display: { xs: "none", md: "block" } }}
                elevation={0}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "0.2px solid #dcdcdc",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <h2 className="my-5 text-xl font-medium">Complete Your Profile</h2>
                <div className="w-44 mx-auto">
                  <CircularProgressbarWithChildren
                    strokeWidth="4"
                    circleRatio="0.5"
                    className="text-primary"
                    value={percentage}
                    styles={buildStyles({
                      rotation: 0.75,
                      pathColor: `rgba(5, 61, 200, ${percentage / 100})`,
                      textColor: "#053dc8",
                      trailColor: "#d6d6d6",
                    })}
                  >
                    <div className="text-xl font-medium text-center text-secondary align-middle -mt-10">
                      <strong>{`${percentage} `}</strong>
                      <span className="text-sm font-normal">{"%"}</span>
                      <p className="text-center text-sm font-normal">Complete</p>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <div className="-mt-10 text-sm">
                  <Timeline>
                    {steps.map((label) => (
                      <TimelineItem key={label}>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>{label}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </div>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NewsFeed;
