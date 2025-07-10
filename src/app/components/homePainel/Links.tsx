import PublicRotas from "../../utils/routes/publicsRoutes";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function RotasList() {
  return (
    <div>
      {Object.entries(PublicRotas).map(([grupo, rotasDoGrupo]) => (
        <div key={grupo}>
          <ul>
            {rotasDoGrupo.map(({ title, path }) => (
              <li key={path}>
                <a
                  href={`/${grupo}${path}`}
                  className="group flex items-center justify-between py-3 px-5 bg-blue-600 rounded-xl my-5 transition-all duration-100 shadow-md hover:shadow-blue-900 cursor-pointer"
                >
                  {title}
                  <IoMdArrowRoundForward
                    size={20}
                    className="transition-transform duration-200 -translate-x-2 group-hover:translate-x-1"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
