const IconButton = ({ children }) => {
  return (
    <div className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
      {children}
    </div>
  );
};

export default IconButton;
