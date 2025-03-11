interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'destroy';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) => {
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-500',
    secondary: 'bg-beige-100 text-gray-900 hover:bg-white hover:outline hover:outline-beige-500',
    destroy: 'bg-red text-white hover:opacity-80',
  };

  return (
    <button
      type={type}
      disabled={false}
      onClick={onClick}
      className={`flex-row-center p-4 rounded-lg cursor-pointer text-preset-4-bold ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
