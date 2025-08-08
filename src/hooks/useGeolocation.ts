import { useEffect, useState } from 'react';

interface GeoLocationResult {
  latitude: number;
  longitude: number;
  address: string | null;
  loading: boolean;
  error: string | null;
}

const useGeolocation = (): GeoLocationResult => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        // 카카오 주소 변환 요청
        // 카카오 주소 변환 요청
        try {
          const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;
          const headers = {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          };

          const response = await fetch(url, {
            method: 'GET',
            headers,
          });

          if (!response.ok) {
            throw new Error('주소 정보를 가져오지 못했습니다.');
          }

          const data = await response.json();
          const fullAddress = data.documents?.[0]?.address?.address_name; // 전체 주소
          const dongOnly = fullAddress?.split(' ')[2]; // 동만 추출
          setAddress(dongOnly ?? null);
        } catch (err) {
          setError('주소 변환 중 오류가 발생했습니다.');
          console.log(err);
        }

        setLoading(false);
      },
      (err) => {
        setError('위치 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
        console.log(err);
      },
    );
  }, []);

  return { latitude, longitude, address, loading, error };
};

export default useGeolocation;
