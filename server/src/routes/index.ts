import {Request, Response, Router} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index", {
        title: "Express"
    });
});

export default router;