import { useEffect, useRef, useState } from "react";
import { FormStatusEnum } from "../types/enums";

type InteractiveBackgroundProps = {
  formStatus: FormStatusEnum;
  followCursor?: boolean;
  cursorPosition?: { x: number; y: number };
};

const InteractiveBackground = (props: InteractiveBackgroundProps) => {
    const colorfulBgRef = useRef(null);

    const setAnimation=(status:FormStatusEnum)=>{
        switch(status){
            case FormStatusEnum.Submitted:
                return "animate-reveal";
            case FormStatusEnum.Submitting:
                return "animate-pulse";
            case FormStatusEnum.Error:
                return "animate-red";
            default:
                return "";
            }
      }

      useEffect(() => {
        if(!props.followCursor) return;
        let prevX=0,prevY=0;
        let lastTime = 0;
        const handleMouseMove = (event: MouseEvent | TouchEvent) => {
          let x, y;
          if (event instanceof MouseEvent) {
            x = event.clientX;
            y = event.clientY;
          } else if (event instanceof TouchEvent && event.touches.length > 0) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
          } else {
            return;
          }
          if(Math.abs(prevX-x+prevY-y)<20 || Date.now()-lastTime<100) return;
          // Dynamically update the clip-path on the colorful background
          if (colorfulBgRef.current) {
            (colorfulBgRef.current as HTMLElement).style.clipPath = `circle(50px at ${x}px ${y}px)`;
            prevX=x;
            prevY=y;
            lastTime=Date.now()
          }
        };
        const handleMouseDown = (event: MouseEvent | TouchEvent) => {
            if (colorfulBgRef.current) {
                (colorfulBgRef.current as HTMLElement).style.clipPath = `circle(20px at ${prevX}px ${prevY}px)`;
            }
        }
        let resetTimeout: NodeJS.Timeout;
        const handleMouseUp = (event: MouseEvent | TouchEvent) => {
            if (colorfulBgRef.current) {
                clearTimeout(resetTimeout);
                if(event instanceof MouseEvent){
                (colorfulBgRef.current as HTMLElement).style.clipPath = `circle(100px at ${prevX}px ${prevY}px)`;
                }
                else{
                    handleMouseLeave(event);
                }
                resetTimeout = setTimeout(() => {
                    if (colorfulBgRef.current) {
                        (colorfulBgRef.current as HTMLElement).style.clipPath = `circle(0px at ${prevX}px ${prevY}px)`;
                    }
                }, 300);
            }
        }
        const handleMouseLeave = (event: MouseEvent | TouchEvent) => {
            if (colorfulBgRef.current) {
                (colorfulBgRef.current as HTMLElement).style.clipPath = `circle(0px at ${prevX}px ${prevY}px)`;
            }
        }

    
        // Attach event listener
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('touchstart', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchcancel', handleMouseLeave);

    
        // Cleanup on unmount
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchstart', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchcancel', handleMouseLeave);

        };
      }, [props.followCursor]);
      
  return (
    <>
      <div className="background"></div>

      <div className={`background-colorful ${setAnimation(props.formStatus)} `} ref={colorfulBgRef}></div>
    </>
  );
};

export default InteractiveBackground;