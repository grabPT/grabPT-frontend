type BaseInfo = {
  name: string;
  birth: string | null;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | null;
  location: string;
};

export function extractBaseFromForm(form: HTMLFormElement | null): BaseInfo | null {
  if (!form) return null;
  const fd = new FormData(form);
  const name = String(fd.get('name') ?? '').trim();
  const birthRaw = String(fd.get('birth') ?? '').trim();
  const phoneNumber = String(fd.get('phoneNumber') ?? '').trim();
  const location = String(fd.get('location') ?? '').trim();
  const genderRaw = String(fd.get('gender') ?? '')
    .trim()
    .toUpperCase();

  const gender: 'MALE' | 'FEMALE' | null =
    genderRaw === 'MALE' || genderRaw === 'FEMALE' ? genderRaw : null;

  const birth: string | null = birthRaw.length ? birthRaw : null;

  return { name, birth, phoneNumber, gender, location };
}
