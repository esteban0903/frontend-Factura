import React, { useState } from "react";
import axios from "axios";
import API_URL from "./config";
const App = () => {
  const [user, setUser] = useState({ name: "", email: "", id: null });
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [userTotal, setUserTotal] = useState("");
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [searchUserId, setSearchUserId] = useState("");
  const [userInvoices, setUserInvoices] = useState([]);
  const [showInvoiceSearch, setShowInvoiceSearch] = useState(false); // Nuevo estado

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/create`, {
        name: user.name,
        email: user.email,
      });

      setUser(response.data); 
      setIsUserCreated(true);
      setError("");
    } catch (error) {
      setError("Error al registrar el usuario.");
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    if (!productName || !productPrice || parseFloat(productPrice) <= 0 || parseInt(productQuantity) <= 0) {
      setError("Ingrese un nombre un precio y una cantidad validos.");
      return;
    }

    const newProduct = {
      name: productName,
      unitPrice: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    setProducts([...products, newProduct]);
    setTotal(total + newProduct.unitPrice * newProduct.quantity);
    setProductName("");
    setProductPrice("");
    setProductQuantity(1);
    setError("");
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    const removedProduct = updatedProducts.splice(index, 1)[0];
    setProducts(updatedProducts);
    setTotal(total - removedProduct.unitPrice * removedProduct.quantity);
  };

  const handleConfirmTotal = async () => {
    if (parseFloat(userTotal) !== total) {
      setError("El total ingresado no coincide con el total calculado.");
      return;
    }

    const newPayment = {
      userId: user.id, 
      products: products, 
      totalAmount: total,
      purchaseDate: new Date().toISOString().split("T")[0], 
      status: "Pendiente",
      responseMessage: "Procesando pago ... ",
    };

    try {
      const response = await axios.post(`${API_URL}/payments/process`, newPayment);
      setTransaction(response.data); 
      setError("");
    } catch (error) {
      setError("Error al guardar la factura.");
      console.error(error);
    }
  };

  const handleSearchInvoices = async () => {
    if (!searchUserId) {
      setError("Ingrese un ID de usuario.");
      return;
    }
  
    try {
      const response = await axios.get(`${API_URL}/payments/user/${searchUserId}`);
      setUserInvoices(response.data);
      setError("");
    } catch (error) {
      setError("Error al buscar las facturas.");
      console.error(error);
    }
  };
  
  const handleShowInvoiceSearch = () => {
    setShowInvoiceSearch(true);
    setUserInvoices([]); 
    setSearchUserId(""); 
  };
  
  const handleGoBack = () => {
    setShowInvoiceSearch(false);
  };

  return (
    <div>
      {!isUserCreated ? (
        <form onSubmit={handleUserSubmit}>
          <input type="text" name="name" placeholder="Nombre" onChange={handleUserChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleUserChange} />
          <button type="submit">Registrar Usuario</button>
        </form>
      ) : (
        <>
          <h3>Usuario ID: {user.id}</h3>
          <button onClick={handleShowInvoiceSearch}>Consultar Factura</button>
  
          <div>
            <h2>Agregar Producto</h2>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio"
              min="0"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad"
              min="1"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
            <button onClick={handleAddProduct}>Agregar</button>
          </div>
  
          <h2>Productos agregados:</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name} - ${product.unitPrice.toFixed(2)} x {product.quantity} = $
                {(product.unitPrice * product.quantity).toFixed(2)}
                <button onClick={() => handleRemoveProduct(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
  
          <h3>Total Calculado: ${total.toFixed(2)}</h3>
  
          <input
            type="number"
            placeholder="Ingrese el total"
            min="0"
            value={userTotal}
            onChange={(e) => setUserTotal(e.target.value)}
          />
          <button onClick={handleConfirmTotal}>Confirmar Pago</button>
  
          {error && <p style={{ color: "red" }}>{error}</p>}
  
          {transaction && (
            <div>
              <h2>Resumen de la Orden</h2>
              <p><b>ID Usuario:</b> {transaction.userId}</p>
              <p><b>ID Factura:</b> {transaction.id}</p>
              <p><b>Total:</b> ${transaction.totalAmount?.toFixed(2)}</p>
              <p><b>Estado:</b> {transaction.status}</p>
              <p><b>Mensaje:</b> {transaction.responseMessage}</p>
            </div>
          )}
        </>
      )}
  
      {showInvoiceSearch && (
        <div>
          <h2>Consultar Facturas</h2>
          <input
            type="text"
            placeholder="Ingrese ID de usuario"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
          />
          <button onClick={handleSearchInvoices}>Buscar</button>
          <button onClick={handleGoBack}>Volver</button>
  
          {error && <p style={{ color: "red" }}>{error}</p>}
  
          <ul>
            {userInvoices.map((invoice, index) => (
              <li key={index}>
                <b>Factura ID:</b> {invoice.id}, <b>Total:</b> ${invoice.totalAmount}, <b>Estado:</b> {invoice.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;