let component = ReasonReact.statelessComponent("TodoApp");

let make = (_children) => {
  ...component,
  render: (_self) =>
    <div>
      <div className="todo-list-card-container">
        <section className="todo-list-card">
          <header className="header">
            <h1>
            {ReasonReact.stringToElement("Todos")}
            </h1>
            <input className="new-todo" placeholder="What needs to be done?" value="" />
          </header>
          <section className="main">
            <input _type="checkbox" id="toggle-all" className="toggle-all" value="on" />
            <label htmlFor="toggle-all">
              {ReasonReact.stringToElement("Mark all as complete")}
            </label>
            <ul className="todo-list">
              <li className="completed">
                <div className="view">
                  <input _type="checkbox" className="toggle" value="on" />
                  <label>
                    {ReasonReact.stringToElement("Taste JavaScript")}
                  </label>
                  <button className="destroy" />
                </div>
                <input className="edit" value="Taste JavaScript" />
              </li>
              <li className="">
                <div className="view">
                  <input _type="checkbox" className="toggle" value="on" />
                  <label>
                    {ReasonReact.stringToElement("Buy a unicorn")}
                  </label>
                  <button className="destroy" />
                </div>
                <input className="edit" value="Buy a unicorn" />
              </li>
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>
                {ReasonReact.stringToElement("3")}
              </strong>
              {ReasonReact.stringToElement(" items left")}
            </span>
            <ul className="filters">
              <li>
                <a className="selected">
                  {ReasonReact.stringToElement("All")}
                </a>
              </li>
              <li>
                <a>
                  {ReasonReact.stringToElement("Active")}
                </a>
              </li>
              <li>
                <a>
                  {ReasonReact.stringToElement("Completed")}
                </a>
              </li>
            </ul>
            <button className="clear-completed">
              {ReasonReact.stringToElement("Clear completed")}
            </button>
          </footer>
        </section>
      </div>
      <footer className="info">
        <p>
          {ReasonReact.stringToElement("Double-click to edit a todo")}
        </p>
        {ReasonReact.stringToElement("Todo list:&nbsp;")}
        <select className="todo-list-select">
          <option value="">
            {ReasonReact.stringToElement("Todos")}
          </option>
          <option value="">
            {ReasonReact.stringToElement("Another List")}
          </option>
        </select>

        <p>
          {ReasonReact.stringToElement("Template by ")}
          <a href="http://sindresorhus.com">
            {ReasonReact.stringToElement("Sindre Sorhus")}
          </a>
        </p>

        <p>
          {ReasonReact.stringToElement("Created by ")}
          <a href="http://github.com/zetavg">
            {ReasonReact.stringToElement("@zetavg")}
          </a>
        </p>
        <p>
          {ReasonReact.stringToElement("Part of ")}
          <a href="http://todomvc.com">
            {ReasonReact.stringToElement("TodoMVC")}
          </a>
        </p>
      </footer>
    </div>
};
