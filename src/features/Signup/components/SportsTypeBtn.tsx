import type { SportsType } from "@/features/Signup/types/SportsType";

interface ISportsTypeBtn{
  type:SportsType;
  img:string
  onClick: ()=>void
  isSelected:SportsType | null
}
export const SportsTypeBtn = ({type, img,isSelected, onClick}:ISportsTypeBtn) => {
  return (
<div
  className={`
    relative w-32 h-32 overflow-hidden rounded-[0.625rem]
    cursor-pointer transform transition duration-200 ease-in-out ${isSelected === type ? 'scale-105' : 'hover:scale-105'}
  `}
  onClick={onClick}
>
  <div className={`
    absolute inset-0 z-0 w-full h-full
    ${isSelected === type ? 'brightness-100' : 'brightness-50'}
  `}>
    <img
      src={img}
      alt="운동 종목 사진"
      className="w-full h-full object-cover"
    />
    {isSelected !== type && (
      <div className="absolute inset-0 bg-gray-900/20" />
    )}
  </div>

  <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white whitespace-nowrap drop-shadow-md">
    {type}
  </div>
</div>
  )
}