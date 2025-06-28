import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #2e3440; /* Nord Polar Night 0 */
    --navy: #3b4252; /* Nord Polar Night 1 */
    --light-navy: #434c5e; /* Nord Polar Night 2 */
    --lightest-navy: #4c566a; /* Nord Polar Night 3 */
    --navy-shadow: rgba(46, 52, 64, 0.7);
    --dark-slate: #5e81ac; /* Nord Frost 3 */
    --slate: #81a1c1; /* Nord Frost 2 */
    --light-slate: #88c0d0; /* Nord Frost 1 */
    --lightest-slate: #d8dee9; /* Nord Snow Storm 0 */
    --white: #eceff4; /* Nord Snow Storm 2 */
    --green: #8fbcbb; /* Nord Frost 0 - muted teal */
    --green-tint: rgba(143, 188, 187, 0.1);
    --pink: #bf616a; /* Nord Aurora Red */
    --blue: #5e81ac; /* Nord Frost 3 */

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
