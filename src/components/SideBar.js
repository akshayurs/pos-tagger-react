function SideBar({ data, selected, setSelected, answers, isPreview }) {
  return (
    <div className="sidebar">
      {data.map((item, index) => {
        return (
          <button
            key={index}
            className={
              "sidebar-btn " +
              (answers[index].marked ? " marked " : "") +
              (answers[index].answered ? " answered " : "") +
              (index == selected ? " selected " : "") +
              (isPreview &&
                (answers[index] &&
                answers[index].correcttags.every(
                  (item, index1) =>
                    item.tag_description == answers[index]?.answer[index1]
                )
                  ? "correct"
                  : "incorrect"))
            }
            onClick={() => {
              setSelected(index);
            }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default SideBar;
