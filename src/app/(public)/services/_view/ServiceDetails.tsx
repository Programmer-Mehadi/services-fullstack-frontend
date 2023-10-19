import {cartSetLocalStorage, setCart} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import {BsFillCartFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";

const ServiceDetails = ({data}) => {
  const {
    id,
    title,
    image,
    description,
    availability,
    location,
    features,
    price,
    upcoming,
    category,
  } = data;

  // Split the features string into an array
  const featureList = features.split("///").slice(1);
  const {cart} = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img src={image} alt={title} className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-600">{description}</p>
          <p className="text-gray-600 mt-2">Availability: {availability}</p>
          <p className="text-gray-600">Location: {location}</p>
          <p className="text-gray-600">Price: ${price}</p>
          <p className="text-gray-600">
            Upcoming: {upcoming === "true" ? "Yes" : "No"}
          </p>
          <p className="text-gray-600">Category: {category.title}</p>
          <h2 className="text-lg font-semibold mt-4">Features:</h2>
          <ul className="list-disc ml-6">
            {featureList.map((feature, index) => (
              <li key={index} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
          <div
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 cursor-pointer flex items-center justify-center mt-10 w-fit gap-3"
            onClick={() => {
              let found = cart?.items?.find((item: any) => item.id == data?.id);

              if (!found) {
                dispatch(
                  setCart({
                    id: id,
                    title: title,
                    price: price,
                    image: image,
                  })
                );
                toast.success("Added to cart");
                dispatch(cartSetLocalStorage());
              } else {
                toast.error("Already added to cart");
              }
            }}
          >
            Add to cart
            <BsFillCartFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
