const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const uploadMultiImage = require("../utils/uploadFiles");

exports.createSubmission = asyncHandler(async (req, res, next) => {
    
    const { creator, contest_id, is_active, date_Created } = req.body;
   
    let contest = await Contest.findById(contest_id);

    //Grabbing AWS URL to import into submission model
    multiImageLocationArray = [];
    let fileArray = req.files,
        fileLocation;
    for (let i = 0; i < fileArray.length; i++) {
        fileLocation = fileArray[i].location;
        multiImageLocationArray.push(fileLocation);
    }
    let files = multiImageLocationArray
    //Creating a new submission with aws url array and submission data received from front end
    if (contest) {
        const createdSubmission = await Submission.create({
            creator,
            contest_id,
            files,
            is_active,
            date_Created,
        });
        //Creating a finding and updating contest to apply submission id to array within contest
        if (createdSubmission) {
            let submissionArr = contest.submissions;
            submissionArr.push(createdSubmission._id);
            contest.submissions = submissionArr;

            const title =contest.title;
            const price =contest.price;
            const description = contest.description;
            const end_date = contest.end_date
            const images = contest.images;
            const submissions = contest.submissions;
            //
            let createdContest = await Contest.findByIdAndUpdate(
                contest_id,
                {
                    title,
                    price,
                    description,
                    end_date,
                    images,
                    submissions,
                },
                { new: true }
            );
            if (createdContest) {
                console.log("successfully updated contest");
            } else {
                console.log("failed to update contest");
            }

            res.status(201).json({
                success: {
                    submission: createdSubmission,
                },
            });
        } else {
            res.status(500);
            throw new Error(
                "Submission could not be processed at this time, Please Try Again"
            );
        }
    } else {
        res.status(500);
        throw new Error(
            "Contest not found to allow submission"
        )
    }
});

exports.getAllSubmissions = asyncHandler(async (req, res, next) => {
   //Grabs necessary data from req params
    console.log(req.params);
    const contest_id = req.params.id;
    const Creator = req.params.creator;
    console.log("contest id",contest_id);
    console.log("creator", Creator);

    /**
     * Test to check if ID exists
     */
    if(!contest_id){
        res.status(404);
        throw new Error("No contest id given");
    }else if(!Creator){
        res.status(404);
        throw new Error("No creator id given");
    }
    /**
     * Does a check on the specific contest to see if the user is the contest owner,
     * if the user is the contest owner. output is all submissions within that contest
     * if the user is not the contest owner shows all submissions related to the user.
     */
    else{
        let contest = await Contest.findById(contest_id);
        
        if (!contest) {
            res.status(404);
            throw new Error("No contest found for given id");
        }

        if(contest.creator.toString() === Creator.toString()){
            let submissions = await Submission.find({contest_id: contest_id});
            res.status(200).json({ submissions: submissions });
        }
        else{
            let submissions = await Submission.find({creator: Creator});
            res.status(200).json({ submissions: submissions });
        }
    }
  });

  exports.getSubmissionById = asyncHandler(async (req, res, next) => {
    const submissionId = req.params.id;
    const creator = req.params.creator;
  
    let submission = await Submission.findById(submissionId);

    if (!submission) {
      res.status(404);
      throw new Error("No submission found for given id");
    }
    else{
        let contest = await Contest.findById(submission.contest_id);
        if(creator.toString() === contest.creator.toString() ){
            res.status(200).json({ submission: submission });
        }
        else if(creator.toString() === submission.creator.toString()){
            res.status(200).json({ submission: submission });
        }
        else{
            res.status(401);
            throw new Error("You do not have permission to view this submission");
        }
    }
  });
  