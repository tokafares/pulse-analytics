interface AvatarProps {
  name: string;
  color: string;
  size?: number;
}

export function Avatar({ name, color, size = 36 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-medium text-white"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
