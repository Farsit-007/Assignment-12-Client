
const WelsomeMessage = ({ message }) => {
    return (
        <div className=" my-5 mx-5 rounded-lg bg-gradient-to-r  from-[#5D0911] to-[#ac0000]">
          <h1 className="text-2xl p-2 px-5 text-white font-bold ">{message} </h1>
        </div>
    );
};

export default WelsomeMessage;