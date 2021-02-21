import TorneosList from "../TorneosList";
import { useQuery } from "@apollo/react-hooks";
import withApollo from "../../utils/withApollo";
import { GET_TEMPORADAS } from "../../graphql/queries";

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);

  const { data, loading, error } = useQuery(GET_TEMPORADAS, {
    variables: { nombre: "2018/2019" },
  });
  if (loading) {
    return "Loading...";
  }
  if (error) {
    console.log("ERROR: ", error);
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          {/* Tabs headers */}
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {data.allTemporadas.data.map((temporada, index) => {
              return (
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === index + 1
                        ? "text-white bg-blue-600"
                        : "text-blue-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(index + 1);
                    }}
                    data-toggle="tab"
                    href={`#link${index + 1}`}
                    role="tablist"
                  >
                    {temporada.nombre}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Tabs content */}
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto">
              <div className="tab-content tab-space">
                {data.allTemporadas.data.map((temporada, index) => {
                  return (
                    <div
                      className={openTab === index + 1 ? "block" : "hidden"}
                      id={`#link${index + 1}`}
                    >
                      <TorneosList nombreTemporada={temporada.nombre} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Tabs);
