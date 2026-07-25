import "./CartItem.css";

function CartItem({ item, onUpdateQuantity, onDelete }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-5">
            <h5>{item.productName}</h5>
          </div>

          <div className="col-md-2">₹ {item.price}</div>

          <div className="col-md-2">
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onUpdateQuantity(item, item.quantity - 1)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onUpdateQuantity(item, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-md-2 fw-bold">₹ {item.totalPrice}</div>

          <div className="col-md-1">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(item.cartId)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
