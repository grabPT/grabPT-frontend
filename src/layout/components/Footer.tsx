import FooterIcons from '@/assets/images/Footer-Icons.png';
import FooterImage from '@/assets/images/FooterImage.webp';
import LogoIcon from '@/assets/images/LogoIcon.svg';

const Footer = () => {
  return (
    <footer className="relative">
      {/* 푸터이미지 & 오버레이 */}
      <img src={FooterImage} alt="푸터배경" className="h-[320px] w-full object-cover" />
      <div className="absolute inset-0 bg-[#000000D9]"></div>

      {/* 내용들 */}
      <div className="absolute inset-0 flex justify-between p-12 pr-28 text-[11px] text-white lg:leading-[140%] lg:font-normal">
        <div className="flex gap-[30px]">
          <div className="w-[30px]">
            <img src={LogoIcon} alt="푸터로고" className="object-cover" />
          </div>
          <div className="mt-1.5 flex w-[541px] flex-col gap-[66px]">
            <header className="text-xl">grabPT @ 2025. All rights reserved.</header>
            <p>
              By building a user-centric online matching system, <br />
              <br />
              through a trainer's suggest in accordance with a user-centered request.
              <br />
              We want to realize PT service at a reasonable price that users want for personalized
              trainers.
              <br />
              In addition, pros who have difficulty in securing new students will be given
              opportunities to secure studentsIt aims to provide a win-win matching system by
              providing a platform environment.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[44px] lg:min-w-sm lg:justify-between [@media(min-width:1112px)]:flex-row">
          <div className="flex flex-col gap-4 [@media(min-width:1112px)]:gap-[66px]">
            <header className="text-xl">Contact us</header>
            <p>GrabPT@.gmail.com</p>
          </div>
          <div className="flex flex-col gap-4 [@media(min-width:1112px)]:gap-[66px]">
            <header className="text-xl">Follow us</header>
            <p>Yes, We are social</p>
            <img src={FooterIcons} alt="아이콘들" className="h-5 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
