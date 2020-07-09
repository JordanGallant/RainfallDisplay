import React, { Component } from "react";
import { withTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import sendToLearningMaterial from "../util/TechnologyTypeRouter";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import LikeThis from "./LikeThis";
import ShareButton from "./ShareButton";

import BasicField from "./fields/BasicField";
import FieldHeading from "./fields/FieldHeading";
import ChipList from "./fields/ChipList";
import Email from "./fields/Email";
import Stipend from "./fields/Stipend";
import BusinessType from "./fields/BusinessType";
import Website from "./fields/Website";
import ItemPhoto from "./fields/ItemPhoto";
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';

function separateAndTrimList(list) {

  if (!list) { return; }

  if (list.length === 0) {
    return [];
  }

  if (typeof list == "number") {
    return [list];
  }

  return list.split(",").map(item => item.trim());
}

class SchoolContent extends Component {
  render() {

    let classes = {
      card : "cardSchool",
      cardHeading : "cardHeading",
      avatar : "avatar",
      media : "media",
      chip : "chip",
      actions : "actions",
      heading : "heading",
    };
    let theme = this.props.theme;
    let school = this.props.school;
    // Check if school object is empty, i.e. object still loading.
    if (Object.keys(school).length === 0 && school.constructor === Object) {
      return (
        <div>
          <LinearProgress color="secondary" />
        </div>
      );
    }
    let technologiesList = separateAndTrimList(school.technologies);
    let locationsList = separateAndTrimList(school.locations);

    // If the user hasn't viewed this school before, then count as an impression.
    // i.e. each user can only generate a single page impression for any school.
    var viewed = JSON.parse(localStorage.getItem('csd-views')) || [];
    const key = school.key;
    let index = viewed.indexOf(key);
    if (index === -1) {
      // Track impression.
      ReactGA.pageview('/' + key);
      // Mark as viewed.
      viewed.push(key);
      localStorage.setItem('csd-views', JSON.stringify(viewed));
      console.log('first view: ' + key)
    }

    const cardStyle = {
      boxShadow: "none"
    }

    const chipStyleBase = {
      margin: "4px 4px 0px 0px"
    };

    const chipStylePrimary = {
      ...chipStyleBase,
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    };

    const chipStyleSecondary = {
      ...chipStyleBase,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText
    };

    // Trim the name, as it may have had spaces added for sorting.
    school.name = school.name.trim();

    let status = "";
    if (
        (school.hasOwnProperty('status'))
        && (school.status.length > 0)
        && (school.status !== "-")
       ) {
      status = <BasicField value={school.status} heading="Status" />
    }

    let dueBack = "";
    if (
        (school.hasOwnProperty('dueBackExtended'))
        && (school.dueBackExtended.length > 0)
        && (school.dueBackExtended !== "-")
       ) {
      dueBack = <BasicField
                      value={school.dueBackExtended}
                      heading="Course Length"
                      tooltip="The length of courses may depend on factors such as full time/part time, program scope, internships and work experience."
                    />
    }

    let borrowingPeriod = "";
    if (school.hasOwnProperty('borrowingPeriod') && school.borrowingPeriod.length > 0) {
      borrowingPeriod = <BasicField value={school.borrowingPeriod} heading="Borrowing Period" />
    }

    let scholarships = "";
    if (school.hasOwnProperty('scholarships') && school.scholarships.length > 0) {
      scholarships = <BasicField value={school.scholarships} heading="Scholarships" />
    }

    let description = "";
    if (school.hasOwnProperty('description') && school.description.toString().length > 0) {
      description = <BasicField value={school.description} heading="Description" />
    }

    let careInstructions = "";
    if (school.hasOwnProperty('careInstructions') && school.careInstructions.toString().length > 0) {
      careInstructions = <BasicField value={school.careInstructions} heading="Care Instructions" />
    }

    let employmentRate = "";
    if (school.hasOwnProperty('employmentRate') && school.employmentRate.toString().length > 0) {
      employmentRate = <BasicField value={school.employmentRate} heading="Employment Rate" />
    }

    let courseStart = "";
    if (school.hasOwnProperty('courseStart') && school.courseStart.length > 0) {
      courseStart = <BasicField value={school.courseStart} heading="When does it start" />
    }

    let employmentAssistance = "";
    if (school.hasOwnProperty('employmentAssistance') && school.employmentAssistance.length > 0) {
      employmentAssistance = <BasicField value={school.employmentAssistance} heading="Employment Assistance" />
    }

    let owner = "";
    if (school.hasOwnProperty('owner') && school.owner.length > 0) {
      owner = <BasicField
                        value={school.owner}
                        heading="Owner"
                        tooltip="Accredited courses have to meet particular standards and are recognized by official bodies."
                      />
    }

    let accreditationExtended = "";
    if (school.hasOwnProperty('accreditationExtended') && school.accreditationExtended.length > 0) {
      accreditationExtended = <BasicField
                        value={school.accreditationExtended}
                      />
    }

    let industryPartners = "";
    if (school.hasOwnProperty('industryPartners') && school.industryPartners.length > 0) {
      industryPartners = <BasicField
                          value={school.industryPartners}
                          heading="Industry Partners"
                          tooltip="Partners may provide additional opportunities for jobs and internships."
                        />
    }

    let successInfo = "";
    if (school.hasOwnProperty('successInfo') && school.successInfo.length > 0) {
      successInfo = <BasicField value={school.successInfo} heading="Successes" />
    }

    let locations = "";
    let locationString = "";
    if (locationsList && (locationsList.length > 0)) {
      locationString = locationsList.join(", ");
      let locationItems = locationsList.map((item, index) => {
        return (
          <Chip
            key={item}
            label={item}
            style={chipStylePrimary}
            property='place'
          />
        );
      });
      locations = <ChipList value={locationItems} heading="Locations" />
    }

    let technologies = "";
    if (technologiesList && (technologiesList.length > 0)) {
      let techItems = technologiesList.map((item, index) => {
            return (
              <Chip
                key={item}
                label={item}
                style={chipStyleSecondary}
                onClick={() => sendToLearningMaterial(item)}
              />
            );
          });
      technologies = <ChipList value={techItems} heading="Technologies" />
    }

    let emailButton = "";
    if (school.hasOwnProperty('publicEmail') && school.publicEmail.length > 0) {
      emailButton = <Email value={school.publicEmail} />
    }

    let stipend = "";
    // Don't show anything if value empty or unknown ("-").
    if (school.hasOwnProperty('stipend') && (school.stipend.length > 0) && (school.stipend !== "-")) {
      stipend = <Stipend value={school.stipend} classes={classes} style={chipStyleBase}/>
    }

    let businessType = "";
    // Don't show anything if value empty or unknown ("-").
    if (school.hasOwnProperty('businessType') && (school.businessType.length > 0) && (school.businessType !== "-")) {
      businessType = <BusinessType value={school.businessType} classes={classes} style={chipStyleBase}/>
    }

    let website = "";
    if (school.hasOwnProperty('website') && school.website.length > 0) {
      website = <Website url={school.website} />
    }

    let yearEstablished = "";
    if (school.hasOwnProperty('yearEstablished') && school.yearEstablished.toString().length > 0) {
      yearEstablished = <div>since <span property='foundingDate'>{school.yearEstablished}</span></div> ;
    }

    let otherHeading = "";
    if ((stipend.toString().length > 0) || (businessType.toString().length > 0)) {
      otherHeading = <FieldHeading heading="Other info" />;
    }

    // Set the Metatag / title to match the current school being rendered.
    let metaTitle = school.name + " overview and comparison";
    let metaDescription = "Compare " + school.name + " with other code schools in South Africa. ";
    if (locationString.length > 0) {
      metaDescription += ", locations: " + locationString;
    }
    metaDescription += ", cost: " + school.cost;

    const schoolTitle = <Typography component="h1" variant="subtitle1" property="name" style={{fontWeight: 'bold'}}>{school.name}</Typography>

    return (
      <div id={this.props.schoolKey} vocab="http://schema.org/" typeof="School">

        <MetaTags>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:image" content={school.photo} />
        </MetaTags>

        <Card className={classes.card} style={cardStyle}>
        <CardHeader
          avatar={
            <Avatar aria-label="School Info" src={school.photo} className={classes.avatar} style={{ borderRadius: 0 }}></Avatar>
          }
          title={schoolTitle}
          subheader={yearEstablished}
          className={classes.cardHeading}
          style={{ paddingBottom: '3px' }}
        />
        <CardMedia
          className={classes.media}
          image={school.photo}
          title={school.name}
        />

        <CardContent>
          <Typography component="p" gutterBottom>
            {school.additionalInfo}
          </Typography>


          <ItemPhoto
            url={school.photo}
          />

          {status}

          {dueBack}

          {borrowingPeriod}

          {scholarships}

          {courseStart}

          {description}
          {careInstructions}

          {employmentAssistance}
          {employmentRate}

          {owner}
          {accreditationExtended}

          {industryPartners}

          {successInfo}

          {locations}

          {technologies}

          {otherHeading}

          {stipend}

          {businessType}

          {website}

        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {emailButton}
          <LikeThis likeClick={this.props.likeClick} school={school} />
          <ShareButton school={school} />
          {/*
          // Requires classnames component. See MUI card demo for sample code.
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
      </Card>
      </div>
    );
  }
}

export default withTheme()(SchoolContent);
