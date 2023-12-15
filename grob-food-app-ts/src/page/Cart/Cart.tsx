import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = ({ createCarttoLocalStorage, cart }: any) => {
  const localcart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(localcart);
  console.log(cart, "CART");

  return (
    <div className="flex flex-col overflow-scroll max-h-[75vh] mt-[20px]">
      {cart?.map((item: any) => {
        return (
          <div>
            <div className="flex min-h-[80px] border-b-[1px] py-[10px]">
              <div className="w-[20%] flex justify-center items-center">
                <RemoveIcon
                  className="text-[16px] md:text-[24px] text-[#00A5CF]"
                  onClick={() => {
                    let result = user_cart.find(
                      //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                      (list: any) => {
                        return list.menu_id == item.menu_id;
                      }
                    );
                    if (result != undefined) {
                      if (item.amount > 0) {
                        item.amount--;
                        item.menu_totalprice =
                          Number(item.menu_price) * Number(item.amount);

                        let newCart = user_cart;

                        window.localStorage.removeItem("cart");
                        createCarttoLocalStorage(newCart);
                      } else {
                        console.log("show");
                      }
                    }
                    console.log(user_cart);
                  }}
                />
                <span className="mx-[5px] md:mx-[10px]">{item.amount}</span>
                <AddIcon
                  className="text-[16px] md:text-[24px] text-[#00A5CF]"
                  onClick={() => {
                    let result = user_cart.find(
                      //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                      (list: any) => {
                        return list.menu_id == item.menu_id;
                      }
                    );
                    if (result != undefined) {
                      item.amount++;
                      item.menu_totalprice =
                        Number(item.menu_price) * Number(item.amount);

                      let newCart = user_cart;

                      window.localStorage.removeItem("cart");
                      createCarttoLocalStorage(newCart);
                    }
                  }}
                />
              </div>
              <div className="hidden md:flex">
                <img
                  className="p-[10px] max-w-[130px] max-h-[130px] bg-cover"
                  src={`data:image/png;base64,${item.menu_image_url}`}
                  alt="menu-image"
                />
              </div>

              <div className="flex-1 px-[10px] md:px-[20px] font-[500]">
                {item.menu_name}
              </div>
              <div className="w-[20%] flex justify-center">
                {item.menu_totalprice}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
