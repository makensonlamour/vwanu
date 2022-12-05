import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import useInfiniteScroll from "./useInfiniteScroll";
import { Facebook } from "react-content-loader";
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import useChatScroll from "./useChatScroll";
// import { useWindowScroll } from "@mantine/hooks";

const InfiniteScroll = ({
  children,
  fetchMore,
  isError,
  hasNext,
  loader,
  noDataRender,
  errorRender,
  refetch,
  container = false,
  classNameContainer,
  isLoading,
  isReverse = false,
  style,
}) => {
  // eslint-disable-next-line no-unused-vars
  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore, hasNext);
  // eslint-disable-next-line no-unused-vars
  // const containerRef = useRef(null);
  const refScroll = useChatScroll(children);
  const [isFetching, setIsFetching] = useState(false);

  function handleScroll() {
    if (refScroll.current?.scrollTop > 30) return;
    setIsFetching(true);
  }

  useEffect(() => {
    refScroll.current?.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    if (!hasNext) return setIsFetching(false);
    fetchMore();
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <>
      {isReverse ? (
        <PullToRefresh
          pullDownContent={<PullDownContent />}
          releaseContent={<ReleaseContent />}
          refreshContent={<RefreshContent />}
          pullDownThreshold={200}
          onRefresh={refetch}
          triggerHeight={50}
          backgroundColor="inherit"
          startInvisible={true}
        >
          <div>
            <div className=""></div>
            {container ? (
              <>
                <BottomScrollListener
                  onBottom={() => {
                    if (!hasNext) return;
                    fetchMore();
                  }}
                />
                <div style={style} ref={refScroll} className={"w-full " + classNameContainer || ""}>
                  {children}
                </div>
              </>
            ) : (
              <div className="w-full">{children}</div>
            )}
            {container ? null : (
              <BottomScrollListener
                onBottom={() => {
                  if (!hasNext) return;
                  fetchMore();
                }}
              />
            )}
            {isLoading && hasNext && (loader || <Facebook foregroundColor="#fff" />)}
            {!hasNext && noDataRender}
            {isError && errorRender}
          </div>
        </PullToRefresh>
      ) : (
        <PullToRefresh
          pullDownContent={<PullDownContent />}
          releaseContent={<ReleaseContent />}
          refreshContent={<RefreshContent />}
          pullDownThreshold={200}
          onRefresh={refetch}
          triggerHeight={50}
          backgroundColor="inherit"
          startInvisible={true}
        >
          <div>
            <div className=""></div>
            {container ? (
              <BottomScrollListener
                onBottom={() => {
                  if (!hasNext) return;
                  fetchMore();
                }}
              >
                {(scrollRef) => (
                  <div style={style} ref={scrollRef} className={"w-full z-30 " + classNameContainer || ""}>
                    {children}
                  </div>
                )}
              </BottomScrollListener>
            ) : (
              <div className="w-full">{children}</div>
            )}
            {container ? null : (
              <BottomScrollListener
                onBottom={() => {
                  if (!hasNext) return;
                  fetchMore();
                }}
              />
            )}
            {isLoading && hasNext && (loader || <Facebook foregroundColor="#fff" />)}
            {!hasNext && noDataRender}
            {isError && errorRender}
          </div>
        </PullToRefresh>
      )}
    </>
  );
};

InfiniteScroll.propTypes = {
  children: PropTypes.any.isRequired,
  fetchMore: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  hasNext: PropTypes.bool.isRequired,
  loader: PropTypes.element,
  noDataRender: PropTypes.element,
  errorRender: PropTypes.element,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  container: PropTypes.bool,
  classNameContainer: PropTypes.string,
  style: PropTypes.object,
  isReverse: PropTypes.bool,
};

export default InfiniteScroll;
