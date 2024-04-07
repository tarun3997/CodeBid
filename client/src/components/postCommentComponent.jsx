export default function CommentForm({handelComment, comment, onChangeComment}) {
    return(
        <form onSubmit={handelComment}>
          <div
            className="group flex flex-col w-full col-span-12 md:col-span-6 mb-6 md:mb-0"
            data-slot="base"
            data-filled="true"
            data-filled-within="true"
          >
            <div
              data-slot="input-wrapper"
              className="w-full inline-flex tap-highlight-transparent flex-row items-center gap-3 !px-1 !pb-0 !gap-0 relative box-border border-b-medium shadow-[0_1px_0px_0_rgba(0,0,0,0.05)] border-default-200 !rounded-none hover:border-default-300 after:content-[''] after:w-0 after:origin-center after:bg-default-foreground after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[2px] after:h-[2px] group-data-[focus=true]:after:w-full h-unit-8 min-h-unit-8 px-2 rounded-small !h-auto transition-background motion-reduce:transition-none !duration-150 after:transition-width motion-reduce:after:transition-none py-2"
              data-has-multiple-rows="true"
              style={{ cursor: "text" }}
            >
              <div
                data-slot="inner-wrapper"
                className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-1"
              >
                <input
                  value={comment}
                  type="text"
                  autoComplete="off"
                  onChange={(e) => onChangeComment(e.target.value)}
                  data-slot="input"
                  className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-foreground h-full transition-height !duration-100 motion-reduce:transition-none"
                  aria-label="Add a comment..."
                  placeholder="Add a comment..."
                  id="react-aria1922290494-:r0:"
                  data-hide-scroll="true"
                  style={{ height: "25px" }}
                ></input>
              </div>
            </div>
          </div>
        </form>
    )
}