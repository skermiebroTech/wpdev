/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( document, $, customize, apiRequest ) {
  const apiBaseUrl = document.querySelector( 'link[rel="https://api.w.org/"]' )
    .getAttribute( 'href' )

  const apiUrl = ( path ) => `${ apiBaseUrl }wp/v2/${ path }`

  if ( customize.selectiveRefresh && $.fn.masonry ) {
    const $widget = $( 'secondary' )

    // http://demo.wp-api.org/wp-json/wp/v2/posts/?filter[p]=470

    $widget.masonry( {} )

    customize.selectiveRefresh.bind( 'sidebar-updated', ( partial ) => {
      if ( 'main-sidebar' === partial.sidebarId ) {
        $widget.masonry( 'reloadItems' )
        $widget.masonry( 'layout' )
      }
    } )
  }

  // Site title and description.
  customize( 'blogname', ( value ) => {
    value.bind( ( to ) => {
      $( '.site-title' ).text( to )
    } )
  } )

  // Update site background color...
  customize( 'blogdescription', ( value ) => {
    value.bind( ( to ) => {
      $( '.site-description' ).text( to )
    } )
  } )

  customize( 'wpbp[wpbp_site_logo_display]', ( value ) => {
    value.bind( ( to ) => {
      const $branding = document.querySelector( '.site-branding' )

      if ( 'none' === to ) {
        $branding.classList.add( 'hidden' )
      } else {
        $branding.classList.remove( 'hidden' )
      }
    } )
  } )

  // Update site background color...
  customize( 'background_color', ( value ) => {
    value.bind( ( to ) => {
      document.documentElement.style.setProperty( '--background-color', to )
    } )
  } )

  const colors = [
    'link_color',
    'link_hover_color',
    'link_active_color',
    'text_color',
    'paragraph_color',
    'heading_color',
  ]

  colors.forEach( ( color ) => {
    // Update site link color in real time...
    customize( `wpbp[custom_${ color }]`, ( value ) => {
      value.bind( ( to ) => {
        color = color.replace( /_/g, '-' )
        document.documentElement.style.setProperty( `--${ color }`, to )
      } )
    } )
  } )

  // Header text color.
  customize( 'header_textcolor', ( value ) => {
    value.bind( ( to ) => {
      if ( 'blank' === to ) {
        $( '.site-title, .site-description' ).css( {
          clip: 'rect(1px, 1px, 1px, 1px)',
          position: 'absolute',
        } )
      } else {
        $( '.site-title, .site-description' ).css( {
          clip: 'auto',
          position: 'relative',
        } )
        $( '.site-title a, .site-description' ).css( {
          color: to,
        } )
      }
    } )
  } )
} )( document, jQuery, wp.customize, wp.apiRequest )
