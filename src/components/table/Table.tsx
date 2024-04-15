import { useState } from 'react';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import './table.scss';
import { doc, deleteDoc, collection, setDoc } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';
import { useToastify } from '../../hooks/useToastify';
import { v4 as uuidv4 } from 'uuid';

export const Table = () => {
  const { data, isPending, error } = useFetchFirestore('objects');

  console.log('data', data);
  console.log('isPending', isPending);
  console.log('error', error);
  const { notify } = useToastify();

  const [write, setWrite] = useState<Boolean>(false);
  const [edit, setEdit] = useState<Boolean>(false);

  const [par_a, setPar_a] = useState<number>(0);
  const [par_b, setPar_b] = useState<number>(0);
  const [par_c, setPar_c] = useState<number>(0);

  const handleAdd = () => {
    const uuid = uuidv4();
    let objem, povrch;

    if (par_b === 0 && par_c === 0) {
      objem = par_a * par_a * par_a;
      povrch = 6 * par_a * par_a;
    } else {
      objem = par_a * par_b * par_c;
      povrch = 2 * (par_a * par_b + par_a * par_c + par_b * par_c);
    }

    const newObject = {
      id: uuid,
      par_a: par_a,
      par_b: par_b,
      par_c: par_c,
      objem: objem,
      povrch: povrch,
    };

    const useRef = doc(collection(projectFirestore, 'objects'), uuid);

    setDoc(useRef, newObject)
      .then(() => {
        notify('success', 'Zápis byl úspěšně přidán');
        setPar_a(0);
        setPar_b(0);
        setPar_c(0);
        window.location.reload();
      })
      .catch((error: any) => {
        notify('error', 'Něco se pokazilo');
        console.error('Error adding document: ', error);
      });
  };

  const handleDelete = async (id: string) => {
    const useRef = doc(collection(projectFirestore, 'objects'), id);
    await deleteDoc(useRef);
    notify('success', 'Zápis byl úspěšně smazán');
    window.location.reload();
  };
  return (
    <div>
      <h1>Tabulka</h1>
      {write ? (
        <form>
          <input
            type="number"
            placeholder="a"
            value={par_a === null ? '' : par_a}
            onChange={(e) => setPar_a(parseInt(e.target.value))}
          />
          <br />
          <input
            type="number"
            placeholder="b"
            value={par_b === null ? '' : par_b}
            onChange={(e) => setPar_b(parseInt(e.target.value))}
          />
          <br />
          <input
            type="number"
            placeholder="c"
            value={par_c === null ? '' : par_c}
            onChange={(e) => setPar_c(parseInt(e.target.value))}
          />
          <br />
          <button type="button" onClick={handleAdd}>
            Přidat
          </button>
          <button type="button" onClick={() => setWrite(false)}>
            Zrušit
          </button>
        </form>
      ) : (
        <button type="button" onClick={() => setWrite(true)}>
          Přidat zápis
        </button>
      )}
      <table>
        <thead>
          <tr>
            <td colSpan={5}>Kvádr/Krychle</td>
            <td colSpan={2} rowSpan={2}>
              Akce
            </td>
          </tr>
          <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>Objem</td>
            <td>Povrch</td>
          </tr>
        </thead>
        <tbody>
          {isPending && (
            <tr>
              <td colSpan={7}>Načítám data...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={7}>{error}</td>
            </tr>
          )}
          {data &&
            data.map((item: any, index) => (
              <tr key={index}>
                <td>{item.par_a}</td>
                <td>{item.par_b === 0 ? `-` : item.par_b}</td>
                <td>{item.par_c === 0 ? `-` : item.par_c}</td>
                <td>{item.objem}</td>
                <td>{item.povrch}</td>
                <td>
                  <button type="button">U</button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(item.id)}>
                    S
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
