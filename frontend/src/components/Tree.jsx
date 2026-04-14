export default function Tree({ path }) {
  const nodes = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="tree">
      {nodes.map((node) => (
        <div
          key={node}
          className={`treeNode ${path.includes(node) ? "active" : ""}`}
        >
          {node}
        </div>
      ))}
    </div>
  );
}