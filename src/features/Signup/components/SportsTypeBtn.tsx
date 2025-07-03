import type { SportsType } from "@/features/Signup/types/SportsType";

interface ISportsTypeBtn{
  type:SportsType;
  img:string
  onClick: ()=>void
  isSelected:SportsType | null
}
export const SportsTypeBtn = ({type, img,isSelected, onClick}:ISportsTypeBtn) => {
  return (
    <div className={`relative w-32 h-32 overflow-hidden rounded-[0.625rem]  hover:brightness-150 hover:scale-120 cursor-pointer ${isSelected === type ? 'brightness-150' : 'brightness-50'}`}
    onClick={onClick}>
      <img
            src={img}
            alt="운동 종목 사진"
            className="z-0 h-auto brightness-50 w-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-semibold whitespace-nowrap text-white">
            {type}
          </div>
    </div>
  )
}
