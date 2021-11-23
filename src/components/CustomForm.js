import React from "react";


const CustomForm = ({pizaa, clearForm, priceList}) => {

    const [total, setTotal] = React.useState(0);
    
  const customPizza = {
    base: [
      {name : "Stuffed Crust", },
      {name : "Cracker Crust", },
      {name : "Flat Bread Crust", },
      {name : "Thin Crust", },
      {name : "Cheese Crust Pizza", },
    ],
    sauce: [
      {name : "Basic Tomato Sauce", },
      {name : "Plum Tomato Sauce", },
      {name : "Spicy BBQ Sauce", },
      {name : "White Cream Sauce", },
      {name : "Garlic Pesto Sauce", },
    ],
    cheese: [
      {name : "Shredded Mozzarella", },
      {name : "Gorgonzola", },
      {name : "Fresh Mozzarella", },
      {name : "Parmesan", },
    ],
    veggies: [
      "Mushrooms",
      "Tomato Slices",
      "Pineapple",
      "Green Olives",
      "Black Olives",
      "Onions",
      "Red Onions",
      "Broccoli",
      "Roasted Potatoes",
    ],
    meat: [
      "Ham",
      "Salami",
      "Ground Beef",
      "Marinated Chicken Breast",
      "Marinated Artichokes",
      "Grilled Zucchini",
      "Pepperoni",
    ],
  };

  React.useEffect(() => {
    document.getElementsByClassName("check").forEach(input => {
        input.checked = false;
    })
  }, [clearForm]);

  React.useEffect(() => {
    let sum = 0;
    Object.keys(pizaa.values).forEach((key) => {
        if(priceList[pizaa.values[key]]) sum += priceList[pizaa.values[key]];
        else {
            if(key === "veggies") sum += (pizaa.values[key].length - 3 > 0 ? (pizaa.values[key].length - 3) * 10 : 0);
            else sum += (pizaa.values[key].length - 1 > 0 ? (pizaa.values[key].length - 1) * 20 : 0);
        }
    })
    setTotal(sum);
  }, [pizaa, priceList]);

  const calculateTotal = () => {
      pizaa.setValues({
          ...pizaa.values,
          price : total
      })
  }

  return (
    <div>
      <form onSubmit={pizaa.handleSubmit}>
        {/* Pizza base */}
        <label htmlFor="flexRadioDefault1" className="text-dark fw-bold mb-2">
          Select Crust
        </label>
        <div className="mb-3" role="group" aria-labelledby="my-radio-group">
          {customPizza.base.map((base, index) => {
            return (
              <label key={index} className="mx-3">
                <input
                  type="radio"
                  name="base"
                  className="mx-1 check"
                  value={base.name}
                  onChange={pizaa.handleChange}
                />
                {base.name} <span className="badge bg-dark">₹ {priceList[base.name]}</span>
              </label>
            );
          })}
        </div>

        {/* Sauce */}
        <label htmlFor="flexRadioDefault1" className="text-dark fw-bold mb-2">
          Select sauce
        </label>
        <div className="mb-3" role="group" aria-labelledby="my-radio-group">
          {customPizza.sauce.map((sauce, index) => {
            return (
              <label key={index} className="mx-3">
                <input
                  type="radio"
                  name="sauce"
                  className="mx-1 check"
                  value={sauce.name}
                  onChange={pizaa.handleChange}
                />
                {sauce.name} <span className="badge bg-dark">₹ {priceList[sauce.name]}</span>
              </label>
            );
          })}
        </div>

        {/* cheese */}
        <label htmlFor="flexRadioDefault1" className="text-dark fw-bold mb-2">
          Select cheese
        </label>
        <div className="mb-3" role="group" aria-labelledby="my-radio-group">
          {customPizza.cheese.map((cheese, index) => {
            return (
              <label key={index} className="mx-3">
                <input
                  type="radio"
                  name="cheese"
                  className="mx-1 check"
                  value={cheese.name}
                  onChange={pizaa.handleChange}
                />
                {cheese.name} <span className="badge bg-dark">₹ {priceList[cheese.name]}</span>
              </label>
            );
          })}
        </div>

          {/* veggies */}
        <label htmlFor="checkbox-group" className="text-dark fw-bold mb-2">
          Select veggies  <span className="text-danger fw-light">(You can select upto 3 veggies for free. ₹ 10 will be charged for each extra veggies)</span>
        </label>
          <div className="mb-3" role="group" aria-labelledby="checkbox-group">
            {customPizza.veggies.map((veggie, index) => {
            return <label key={index} className="mx-3">
              <input type="checkbox" name="veggies" className="mx-1 check" value={veggie} onChange={pizaa.handleChange}/>
              {veggie}
            </label>
            })}
          </div>

          {/* meat */}
        <label htmlFor="checkbox-group" className="text-dark fw-bold mb-2">
          Select meat <span className="text-danger fw-light">(You can select upto 1 meat for free. ₹ 20 will be charged for each extra meats)</span>
        </label>
          <div className="mb-3" role="group" aria-labelledby="checkbox-group">
            {customPizza.meat.map((meat, index) => {
            return <label key={index} className="mx-3">
              <input type="checkbox" name="meat" className="mx-1 check" value={meat} onChange={pizaa.handleChange}/>
              {meat}
            </label>
            })}
          </div>

          <div className="modal-footer d-flex w-100 justify-content-between">
                <h6 className="text-light" name="total" onChange={pizaa.handleChange}>Total price - ₹{total}</h6>
              <button className="btn btn-dark" type="submit" onClick={calculateTotal}>Add to cart</button>
          </div> 
      </form>
    </div>
  );
};

export default CustomForm;
