interface Props {
  title: string;
}

const Header = ({ title = "" }: Props) => {
  return (
    <header className="mb-12 border-b px-4 py-14 text-center dark:border-purple-900">
      <h2 className="mx-auto text-2xl font-bold uppercase">{title}</h2>
    </header>
  );
};

export default Header;
