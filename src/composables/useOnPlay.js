import usePlayer from "./usePlayer";
import { useAuthModal } from "./useAuthModal";
import { useAuthUser } from "./useAuthUser";

const useOnPlay = (songs) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const authUser = useAuthUser();

  const onPlay = (id) => {
    if (!authUser.user?.id) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song?.id));
  };

  return onPlay;
};

export default useOnPlay;
