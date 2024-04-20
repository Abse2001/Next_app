import { Post } from "@global-types";
import PromptCard from "./PromptCard";

const Profile = ({
  handleDelete,
  handleEdit,
  data,
  desc,
  name,
}: {
  name: string;
  desc: string;
  data: Post[];
  handleDelete: (post: Post) => void;
  handleEdit: (post: Post) => void;
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile hello</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout ">
        {data.map((post: Post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
