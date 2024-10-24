import { FormStatusEnum } from "../types/enums";

type InteractiveBackgroundProps = {
  formStatus: FormStatusEnum;
};

const InteractiveBackground = (props: InteractiveBackgroundProps) => {

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
  return (
    <>
      <div className="background"></div>

      <div className={`background-colorful ${setAnimation(props.formStatus)} `}></div>
    </>
  );
};

export default InteractiveBackground;