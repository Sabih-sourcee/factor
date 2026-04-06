/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className = "", height = 48 }: LogoProps) {
  return (
    <img
      src="https://factorled.pk/wp-content/uploads/2025/01/Factor-Logo-negative-01-scaled.png"
      alt="Factor LED"
      className={`w-auto ${className}`}
      style={{ height: `${height}px` }}
      referrerPolicy="no-referrer"
    />
  );
}
