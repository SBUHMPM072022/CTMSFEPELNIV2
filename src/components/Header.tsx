'use client';

interface HeaderProps {
  title: string;
  userName?: string;
}

export default function Header({ title, userName = 'Ivan' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-gray-400 font-normal">{title}</h1>
        <span className="text-base font-medium text-[#2d7dd2]">Welcome back, {userName}</span>
      </div>
    </header>
  );
}
