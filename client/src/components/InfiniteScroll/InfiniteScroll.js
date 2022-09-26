/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import useInfiniteScroll from "./useInfiniteScroll";
import { Facebook } from "react-content-loader";
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import { BottomScrollListener } from "react-bottom-scroll-listener";

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
}) => {
  // eslint-disable-next-line no-unused-vars
  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore, hasNext);

  return (
    <>
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
                <div ref={scrollRef} className={classNameContainer || ""}>
                  {children}
                </div>
              )}
            </BottomScrollListener>
          ) : (
            <div>{children}</div>
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
};

export default InfiniteScroll;
