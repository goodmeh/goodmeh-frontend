// FIXME: This is a temporary fix because github actions is failing when trying to import the logo from the svg file.
export const GoodmehLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 800 400"
      xmlSpace="preserve"
      {...props}
    >
      <style type="text/css">
        {`.st0{fill:none;stroke:#FFB703;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st1{fill:none;}
        .st2{fill:#FFB703;user-select:none;}
        .st3{font-family:'Super Foods';}
        .st4{font-size:160px;}
        .st5{letter-spacing:8;}`}
      </style>
      <g>
        <path
          className="st0"
          d="M224.49,158.22c-4.95-14.84-6.18-22.26-3.71-33.38s6.18-24.73,17.31-29.68c11.13-4.95,19.17-0.62,19.17-0.62
            c7.42,4.95,4.95,17.31,7.42,28.44s7.42,33.38,12.36,43.28c4.95,9.89,16.07,28.44,16.07,59.35s-12.36,70.48-40.8,79.13
            s-59.97,6.8-87.17-6.8s-66.77-34.62-82.84-50.69c-7.71-7.71-12.07-17.73-11.13-21.02c2.47-8.66,16.07-14.84,27.2-13.6
            c10.13,1.13,3.71,0,25.97,12.36c11.64,6.47,21.02,9.89,19.78,13.6s-18.55-3.71-25.97-7.42s-23.49-13.6-39.57-27.2
            C62.52,190.36,55.1,178,62.52,165.64s44.51-1.24,56.88,4.95c12.36,6.18,33.38,25.97,37.09,30.91s-18.47-8.78-25.97-13.6
            c-17.31-11.13-39.57-35.86-45.75-49.46c-6.18-13.6-12.36-21.02-1.24-30.91c13.07-11.62,39.57,7.42,45.75,11.13
            c6.18,3.71,27.2,21.02,37.09,29.68c9.89,8.66,18.55,19.78,17.31,21.02c-1.24,1.24-16.07-8.66-24.73-17.31
            c-15.47-15.47-22.26-27.2-30.91-42.04s-7.42-34.62,2.47-38.33c9.89-3.71,29.68,8.66,44.51,23.49c8.74,8.74,46.99,56.88,50.69,65.53
            s2.47,9.89-4.95,21.02s-14.84,28.44,1.24,54.4s24.73,34.62,32.15,38.33c7.42,3.71,14.84-3.71,7.42-9.89
            c-7.42-6.18-28.44-27.2-64.3-25.97"
        />
        <g>
          <rect
            x="312.37"
            y="71.05"
            className="st1"
            width="428"
            height="257.95"
          />
          <text transform="matrix(1 0 0 1 323.8126 180.1689)">
            <tspan x="0" y="0" className="st2 st3 st4 st5">
              GOOD{" "}
            </tspan>
            <tspan x="6.32" y="130" className="st2 st3 st4 st5">
              MEH?
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};
