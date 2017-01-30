import Relay from 'react-relay'

class Artist extends Relay.Route {
  static queries = {
    artist: (component, params) => Relay.QL`
      query {
        artist(id: $artistID) {
          ${component.getFragment('artist', params)}
        }
      }
    `,
  };

  static paramDefinitions = {
    artistID: { required: true },
  };

  static routeName = 'ArtistRoute';
}

class Home extends Relay.Route {
  static queries = {
    home: (component, params) => Relay.QL`
      query {
        home_page {
          ${component.getFragment('home', params)}
        }
      }
    `,
  };

  static routeName = 'HomeRoute';
}

class Gene extends Relay.Route {
  static queries = {
    gene: (component, params) => Relay.QL`
      query {
        gene(id: $geneID) {
          ${component.getFragment('gene', params)}
        }
      }
    `,
  };

  static paramDefinitions = {
    geneID: { required: true },
    medium: { required: false },
    price_range: { required: false },
  };

  static routeName = 'ArtistRoute';
}
export default {
  Artist,
  Home,
  Gene
}
