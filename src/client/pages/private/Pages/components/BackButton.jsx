import { useNavigate } from 'react-router-dom';
export const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Go back one step in the history stack
  };
  return (
    <button onClick={goBack} className='bg-sky-100 p-2 rounded-lg my-6 mx-14'>Go Back</button>
  );
}
