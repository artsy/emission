import React from "react"
import { ScrollView } from "react-native"

import { Sans12, Serif16 } from "../Elements/Typography"

import { BiddingThemeProvider } from "../Components/BiddingThemeProvider"
import { Button } from "../Components/Button"
import { Container } from "../Components/Containers"
import { Input } from "../Components/Input"
import { Title } from "../Components/Title"

import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import { Flex } from "../Elements/Flex"
import { Address } from "./ConfirmFirstTimeBid"

interface BillingAddressProps {
  onSubmit?: any
}

export class BillingAddress extends React.Component<BillingAddressProps> {
  validationSchema = Yup.object().shape({
    fullName: Yup.string().required("This field is required"),
    addressLine1: Yup.string().required("This field is required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    postalCode: Yup.string().required("This field is required"),
  })

  render() {
    return (
      <BiddingThemeProvider>
        <ScrollView>
          <Formik
            validationSchema={this.validationSchema}
            initialValues={
              {
                fullName: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
              } as any
            }
            onSubmit={values => this.props.onSubmit(values)}
          >
            {({ errors, touched, setFieldValue, handleSubmit }: FormikProps<Address>) => (
              <Container>
                <Title mt={0} mb={6}>
                  Your billing address
                </Title>
                <Serif16 mb={2}>Full name</Serif16>
                <StyledInput
                  onChangeText={text => setFieldValue("fullName", text)}
                  placeholder="Enter your full name"
                  mb={3}
                  error={touched.fullName && errors.fullName}
                />

                <Serif16 mb={2}>Address line 1</Serif16>
                <StyledInput
                  onChangeText={text => setFieldValue("addressLine1", text)}
                  placeholder="Enter your street address"
                  mb={3}
                  error={touched.addressLine1 && errors.addressLine1}
                />

                <Serif16 mb={2}>Address line 2 (optional)</Serif16>
                <StyledInput
                  onChangeText={text => setFieldValue("addressLine2", text)}
                  placeholder="Enter your apt, floor, suite, etc."
                  mb={3}
                  error={touched.addressLine2 && errors.addressLine2}
                />

                <Serif16 mb={2}>City</Serif16>
                <StyledInput
                  onChangeText={text => setFieldValue("city", text)}
                  placeholder="Enter city"
                  mb={3}
                  error={touched.city && errors.city}
                />

                <Serif16 mb={2}>State, Province, or Region</Serif16>
                <StyledInput
                  onChangeText={text => setFieldValue("state", text)}
                  placeholder="Enter state, province, or region"
                  mb={3}
                  error={touched.state && errors.state}
                />

                <Serif16 mb={2}>Postal code</Serif16>
                <StyledInput
                  onChangeText={text => setFieldValue("postalCode", text)}
                  placeholder="Enter your postal code"
                  mb={3}
                  error={touched.postalCode && errors.postalCode}
                />

                <Button text="Add billing address" onPress={handleSubmit as any} />
              </Container>
            )}
          </Formik>
        </ScrollView>
      </BiddingThemeProvider>
    )
  }
}

const StyledInput = ({ error, ...props }) => (
  <Flex mb={4}>
    <Input error={Boolean(error)} {...props} />
    {error && <Sans12 color="red100">{error}</Sans12>}
  </Flex>
)
