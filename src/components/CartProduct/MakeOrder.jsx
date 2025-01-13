export const makeOrder = async (cart, navigate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const clientId = 3; // أو قم بالحصول عليها من بيانات المستخدم
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const details = cart.map((item) => ({
        productid: item.id,
        quantity: item.quantity,
        totalprice: item.price * item.quantity,
      }));

      const requestBody = {
        productid: cart.map((item) => item.id),
        clientid: clientId,
        total: total,
        details: details,
      };

      const response = await fetch("http://127.0.0.1:8000/api/make-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // الطلب نجح
        console.log("Order successful:", data);
        localStorage.setItem("cart", JSON.stringify([])); // تفريغ الكارت من localStorage
        resolve(data); // إعادة الـ data للـ Promise كـ resolve
      } else {
        // الخطأ في الطلب
        console.log("Error:", data);
        reject(data); // reject الـ Promise
      }
    } catch (error) {
      // في حالة وجود خطأ في الاتصال أو شيء آخر
      console.error("Error making order:", error);
      reject(error); // reject الـ Promise
    }
  });
};
