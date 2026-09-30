---
title: "Models and Engineering · II | How a Tank Becomes a Model: Conservation, Measurement, and Identification"
postSlug: from-observation-to-model
published: 2026-09-30
image: './from-observation-to-model/cover-2026.webp'
description: "From volume balance to outlet flow and sensor calibration: why one drainage curve identifies only a parameter ratio, and how that result guides measurement design."
tags: ["mathematical modeling", "parameter identification", "measurement"]
category: Engineering Practice
draft: false
lang: en
---

Open the outlet and watch the water level fall. A recorded curve can tell us when the tank might empty. We can also ask whether it reveals the tank's size and the outlet's performance.

The second question invites an expectation: dense enough sampling and accurate enough instruments should identify the parameters. Working through a simple model changes that expectation. For an ideal tank with constant cross section, if both area and outflow coefficient are unknown, drainage height alone identifies only their ratio, even without measurement error. This result changes what should be measured next.

Modeling therefore adds another task. The [previous essay](/en/posts/mathematical-language-and-problems/) expressed dependencies and resource constraints. Here we ask what the quantities in an equation refer to, which relations follow from physical balance, and which depend on the apparatus and measurement. These connections let the formula answer the original question.

## Conservation Accounts for Change

Take a tank with fixed cross-sectional area $A>0$ and height $h(t)$. Set zero height at the outlet's horizontal plane and let $V(t)=Ah(t)$ be the volume above it. Any residual water below that plane is counted separately. Assume a nearly level surface and constant liquid density.

Over an interval, inflow increases storage and outflow decreases it. With all flows accounted for, the volume balance is

$$
V(t_2)-V(t_1)
=\int_{t_1}^{t_2}\bigl(q_{\mathrm{in}}(t)-q_{\mathrm{out}}(t)\bigr)\,dt.
$$

Here $q_{\mathrm{in}}$ and $q_{\mathrm{out}}$ are volume flow rates, for example in cubic meters per second, while $V$ is in cubic meters. This integral asks where the water enters and leaves. Leakage belongs among the outflows; varying cross section requires changing $V=Ah$.

When the quantities are sufficiently smooth, differentiation gives

$$
A\frac{dh}{dt}=q_{\mathrm{in}}-q_{\mathrm{out}}.
$$

This constrains changes in height without yet determining the next height from the current one. We still need a relation between outflow, height, and the outlet. Conservation connects flows to storage; the outflow law requires a separate basis. The process-control lecture's tank example combines mass balance, constant density and cross section, and an outlet relation in this way.[^balance]

## An Outflow Law Brings Further Conditions

For a fixed outlet and opening, use the familiar idealized orifice relation

$$
q_{\mathrm{out}}=\kappa\sqrt h,\qquad \kappa>0.
$$

The square-root dependence comes from an approximation to outlet flow. The coefficient $\kappa$ combines outlet area, gravity, discharge coefficient, and related factors. In meters and seconds its dimensions are $\mathrm m^{5/2}/\mathrm s$. It differs from area $A$ and is not determined by volume balance alone.[^outflow]

Substitution closes the height equation:

$$
A\frac{dh}{dt}=q_{\mathrm{in}}-\kappa\sqrt h.
$$

Given initial height, inflow, area, and outflow coefficient, we can solve for height. This model omits surface fluctuations, the local flow field near the outlet, and time-varying discharge coefficients as separate objects. If those changes matter to the intended use, the equation or its scope must change.

Two reasons carry different responsibilities. Storage change must agree with inflow and outflow: that is balance. The range over which outflow follows a square-root law depends on flow conditions and apparatus. A sound balance may still use an unsuitable outflow law; a suitable law will still give wrong heights if an inflow is omitted.

The distinction affects choices. A larger cross section or a smaller outflow coefficient can prolong drainage. How does the height curve respond to each? The model now makes that question calculable.

## What One Curve Identifies

Close the inflow and take $h_0>0$. Where height is positive and the outflow law holds,

$$
\frac{dh}{dt}=-\beta\sqrt h,
\qquad \beta=\frac\kappa A.
$$

Define $y(t)=\sqrt{h(t)}$. Since $h>0$, the chain rule gives

$$
\frac{dy}{dt}
=\frac{1}{2\sqrt h}\frac{dh}{dt}
=-\frac\beta2.
$$

The square root of height therefore falls linearly:

$$
\sqrt{h(t)}=\sqrt{h_0}-\frac\beta2t.
$$

Its slope identifies $\beta$ from ideal calibrated height records. But the equation contains $\kappa/A$, without separate traces of area and outflow coefficient. Multiply both by any $c>0$:

$$
(A,\kappa)\longmapsto(cA,c\kappa),
$$

The ratio and the entire height trajectory from the same initial height stay unchanged. A larger tank paired with a proportionally larger outflow coefficient has the same falling height, but different stored volume and actual outflow.

![Parameter pairs A=1, κ=0.4 and A=2, κ=0.8 give identical heights but different volumes.](./from-observation-to-model/identification.en.svg)

*Original theoretical curves, with h₀=1 m, A=1 or 2 m², and κ=0.4 or 0.8 m⁵ᐟ²/s. Both pairs have the same κ/A. Only positive heights are plotted; these are not measurements.*

Sampling density is not the obstacle. However dense and noise-free the record, this no-inflow height observation cannot distinguish the parameter pairs. Structural nonidentifiability means that different parameters give the same result under the chosen experiment and observation. Finite noisy data can make an identifiable quantity hard to estimate; here the observation relation itself loses the distinction.

The model also gives the ideal emptying time $t_*={2\sqrt{h_0}}/{\beta}$. Identifying the ratio may suffice for emptying time from the same initial height. To calculate discharged volume at a given time, height alone is insufficient because area is also needed. Whether every parameter must be known depends on the quantity being asked for.

Emptying time retains the outflow law's conditions. Extrapolation to zero height is the ideal model's answer. At low heights, surface tension can stop actual flow through a small outlet early. Fabusola and Simon explicitly discuss this invalidity region after constructing conservation and outflow equations.[^outflow] Agreement farther from empty cannot establish the final part of actual drainage.

## Reasoning Can Redesign Measurement

If drainage height identifies only a ratio, a different observation must preserve different information. Area need not be estimated from drainage: geometry may be measured directly. Alternatively, with no outflow or other volume change, add a known amount of water and compare the settled heights before and after.

For added volume $\Delta V$ and height increase $\Delta h>0$, constant cross section gives

$$
A=\frac{\Delta V}{\Delta h}.
$$

An independent area estimate combined with the drainage slope gives $\kappa=A\beta$. The added value comes from changing the observation: height change is now connected to known volume. A longer record of the original drainage cannot do the same job.

Another proposed experiment uses known constant inflow $q_*$. If height reaches a positive steady state $h_*$, inflow equals outflow, giving

$$
\kappa=\frac{q_*}{\sqrt{h_*}}.
$$

This relation contains no $A$, complementing the drainage relation that contains only $\kappa/A$. It suggests an experiment to conduct. Its suitability depends on independent inflow measurement, attainment of steady state, and validity of the same outlet law at that height.

Measurement enters modeling itself. We propose quantities, calculate that the current observation mixes their effects, and redesign the experiment to separate them. A useful model may first tell us what existing data cannot answer.

## From an Instrument Reading to Height

The derivations treated the record as accurate $h(t)$. An instrument may instead produce resistance, voltage, or an integer that becomes “height” only after calibration. Comparing prediction with recorded readings requires this conversion.

Fabusola and Simon make the step explicit: integer liquid-level readings are converted to length using a calibration curve, and the calibrated model is compared with a separate drainage experiment.[^measurement] Their tank has varying cross section; our teaching model has constant cross section. Both require establishing and checking the relation between readings and physical quantities.

After conversion to length, one simplified measurement expression is

$$
z_i=h(t_i)+b+\varepsilon_i.
$$

Here $z_i$ is record $i$, $b$ is an unremoved fixed bias, and $\varepsilon_i$ represents other measurement error. The ideal slope derivation took $b=0$ and $\varepsilon_i=0$. Probabilistic parameter inference also needs assumptions and grounds for the error distribution and dependence between records.

Unknown fixed bias deserves attention. Even positive readings generally do not yield the true straight line when their square roots are taken. Attributing all the resulting curvature to outflow parameters might reduce the current fit error while writing a measurement defect into the dynamics. The altered model would retain the sensor error.

Time has a similar role. Is a record instantaneous, averaged over a window, or delayed by filtering? The same continuous height curve yields different records through these operations. Apply the same observation operation to predictions before comparison. Sharing the name “height” does not equate an instantaneous value with an average.

## What Kind of Use Does a Fit Support?

A close fit to drainage records is meaningful under that initial condition, outlet configuration, and observation procedure. Periodic inflow or a replacement outlet changes some of the checked relations while leaving others intact.

Volume balance may retain its form; the same tank may retain its cross section. But measurement of the new inflow, changes in outlet parameters, and the outflow law's validity over new heights all enter the new prediction. Transfer requires deciding which specific relations remain applicable.

The issue persists with a learned predictor. If past height records predict the next record, input window, sampling interval, inflow conditions, and prediction horizon already define the task. A learned mapping may perform well under the test conditions. Predicting a new inflow plan requires relevant input information and checks for that use. Many network parameters do not make an unobserved inflow observable.

Every predictor need not recover area and discharge coefficient. Learning short-term readings directly may suit unchanged apparatus and operation. Explaining an outlet replacement, calculating discharged volume, or designing a new inflow requires different relations, and hence different expression and checking.

The original falling curve now supports a definite judgment: under the stated ideal conditions it identifies the drainage ratio. Independent volume or flow measurement separates the parameters. Extrapolation near empty still needs an outflow-validity check. Each conclusion has grounds and points to an observation or assumption to change next.

The model gains content through this exchange. Conservation accounts for change, an outflow law supplies a specific relation, measurement connects mathematical quantities to records, and identification helps choose experiments. The [next essay](/en/posts/inside-the-model/) temporarily fixes those empirical grounds and asks what changes, and what remains the same, when height becomes volume.

---

**Models and Engineering: the six core essays**

1. [How Mathematics Grasps a Problem](/en/posts/mathematical-language-and-problems/)
2. [How a Tank Becomes a Model](/en/posts/from-observation-to-model/)
3. [What a Model Retains](/en/posts/inside-the-model/)
4. [Which Conclusions Survive a Model Change?](/en/posts/model-transformations/)
5. [How a Model Becomes a Component](/en/posts/model-as-open-component/)
6. [From Models to Engineering Judgment](/en/posts/engineering-model-chain/)

[^balance]: Tom Co, Michigan Technological University, *CM3310 Lecture 8: Modeling and Simulation*, slides 3–4, equation (1). The notes start with mass balance and then impose constant density and cross section. Here fixed opening is absorbed with the discharge coefficient into $\kappa$. [Lecture PDF](https://pages.mtu.edu/~tbco/cm416/lecture_08_2020.pdf).

[^outflow]: Gbenga Fabusola and Cory M. Simon, *Inferring the Shape of a Solid Inside a Draining Tank from Its Liquid Level Dynamics*, arXiv:2408.14503v1, 2024, §3.1, equations (2)–(6) and the following “A regime of model invalidity.” The constant-area solution and parameter-scaling counterexample are derived here. [Paper](https://arxiv.org/html/2408.14503v1#S3.SS1).

[^measurement]: Ibid., §2, “The liquid level sensor,” and §5.1.5, “Testing the calibrated model with a replicate experiment.” [Apparatus and measurement](https://arxiv.org/html/2408.14503v1#S2).
