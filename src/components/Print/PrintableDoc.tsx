/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { /*useState,*/ } from "react";
import "./Print.scss";
import { Page, Text, View, Svg, Document, StyleSheet } from '@react-pdf/renderer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

//<FontAwesomeIcon icon={faSync} className={"icon"}/>




// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     backgroundColor: "#E4E4E4",
//     padding: "10px 15px"
//   },
//   header: {
//     flexDirection: "row",
//   },
//   headerChild: {
//     flexDirection: "column",
//   },
//   heading: {
//     fontStyle: "bold",
//   },
//   // section: {
//   //   margin: 10,
//   //   padding: 10,
//   //   flexGrow: 1
//   // }
// });

const PrintableDoc: React.FC/*<Props> = (props)*/ = () => {
  return (
    <Document>
      <Page>
        <View>
          {["p", "pp", "ppp", "pppp", "ppppp"].map((i) => {
            return <Text>{i}</Text>
          })}

          <View render={() => <FontAwesomeIcon icon={faSync} className={"icon"}/>}/>
        </View>
      </Page>
    </Document>
  )
  /*
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>

          <View style={styles.headerChild}>

            <Text style={styles.heading}>
              Kalawati Enterprises
            </Text>

            <Svg>
              <G fill="#232627">
              </G>
            </Svg>
          </View>

        </View>
      </Page>
    </Document>
  );
   */
}

export default PrintableDoc;
