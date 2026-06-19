// The TasteBud wordmark + glyph. The SVG path is the official brand logo
// (matches public/brand-icon.svg and the app).

export function BrandGlyph({
  width = 34,
  height = 24,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="3372 1671 1029 733"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="TasteBud logo"
    >
      <path
        d="M3382.03 1681.53L3382.03 1851.53L3595.03 1851.53L3595.03 2393.53L3795.03 2393.53L3795.03 1851.53L3796.19 1681.53L3382.03 1681.53Z"
        fill="#FFF0DB"
      />
      <path
        d="M3845 1682L3845 2022.16C3892.24 2083.11 3968.99 2126.05 4078.75 2125.97C4204.86 2125.87 4246.72 2102.38 4256.28 2126.31C4283.19 2193.67 4023.1 2165.89 3938.81 2183.03C3896.14 2191.71 3862.22 2222.75 3845 2243.06L3845 2393.53L4036 2393.53C4073.49 2393 4124.17 2393 4153.5 2393C4202.17 2393 4239.17 2392.53 4275.5 2370.53C4311.83 2348.53 4340.17 2318.36 4360.5 2280.03C4380.83 2241.7 4391 2197.53 4391 2147.53C4391 2097.53 4380.83 2053.2 4360.5 2014.53C4340.17 1975.86 4311.83 1945.7 4275.5 1924.03C4239.17 1902.36 4196.67 1891.53 4148 1891.53C4118.67 1891.53 4147.99 1891.52 4043.41 1893.16C4042.51 1893.17 4041.87 1893.23 4041 1893.25L4041 1682L3845 1682Z"
        fill="#AB1F00"
      />
      <path
        d="M4112.69 1681.53C4112.69 1681.53 4117.5 1707.87 4129.57 1729.47C4170.37 1802.48 4213.01 1827.2 4260.07 1849.94L4260.07 1681.53L4112.69 1681.53Z"
        fill="#AB1F00"
      />
    </svg>
  );
}

export function BrandLogo({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[11px] ${className ?? ""}`}>
      <BrandGlyph width={size * 1.55} height={size * 1.1} />
      <span
        className="font-extrabold tracking-[-0.01em]"
        style={{ fontSize: size }}
      >
        TasteBud
      </span>
    </span>
  );
}
