import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "@/types/index";
import { addUserToProject } from "@/api/TeamApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember
  reset: () => void
};

const SearchResult = ({ user, reset }: SearchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  //const navigate = useNavigate()// En caso de querer cerrar el modal al agregar un colaborador al proyecto

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]})
      //navigate(location.pathname, { replace: true })// En caso de querer cerrar el modal al agregar un colaborador al proyecto
    },
  });

  const handleAddUserToProject = async () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          onClick={handleAddUserToProject}
          className="text-gray-600 hover:bg-gray-300 px-10 py-3 font-bold cursor-pointer"
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
};

export default SearchResult;
