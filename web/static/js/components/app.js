import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <header className="header">
          <nav role="navigation">
            <ul className="nav nav-pills pull-right">
              <li><Link to='/caves/'>Cave Maps</Link></li>
              <li><a href='/caves/new'>New Cave</a></li>
              <li><a href='/caves'>Edit Caves</a></li>
            </ul>
          </nav>
        </header>

        <main role="main">
          {this.props.children}
        </main>
      </div>
    )
  }
})
