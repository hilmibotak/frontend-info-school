const Text = ({ children, className }) => {
  return <p className={`text-base ${className}`}>{children}</p>
}

export default Text